import axios from 'axios'
import {
  startOfYear,
  endOfYear,
  isWithinInterval,
  parseJSON,
  min,
  max,
  format,
} from 'date-fns'
import zipObject from 'lodash/zipObject'
import minBy from 'lodash/minBy'
import maxBy from 'lodash/maxBy'

var allFireballs = []

const apiClient = axios.create()

export function fetchFireballs() {
  if (process.env.NODE_ENV === 'production') {
    return apiClient.get('/fireball/fireballs.json')
  }

  return apiClient.get('/fireball.api', {
    params: {
      'req-loc': true,
    },
  })
}

export function fetchFireballsForYearRange(yearRange) {
  return apiClient.get('', {
    params: {
      'date-min': `${yearRange[0]}-01-01`,
      'date-max': `${yearRange[1]}-12-31`,
    },
  })
}

export function parseResponse(response) {
  // Apply field labels to API response data into workable JSON
  // See formatting at https://ssd-api.jpl.nasa.gov/doc/fireball.html
  const { fields, data } = response
  const parsedFireballs = data.map((fireball) => {
    const updatedFireball = zipObject(fields, fireball)
    if (updatedFireball.lat) {
      updatedFireball.lat =
        updatedFireball['lat-dir'] === 'N'
          ? Number(updatedFireball.lat)
          : -Number(updatedFireball.lat)
    }
    if (updatedFireball.lon) {
      updatedFireball.lon =
        updatedFireball['lon-dir'] === 'E'
          ? Number(updatedFireball.lon)
          : -Number(updatedFireball.lon)
    }
    return updatedFireball
  })
  // Cached all fireballs for subsequent local date filtering
  allFireballs = parsedFireballs
  // Return parsed
  return parsedFireballs
}

export function getFireballsForYearRange(range) {
  const startYear = startOfYear(new Date(range[0], 0))
  const endYear = endOfYear(new Date(range[1], 0))
  return allFireballs.filter((fireball) => {
    const compareDate = parseJSON(fireball.date)
    if (isWithinInterval(compareDate, { start: startYear, end: endYear })) {
      return fireball
    }
  })
}

export function getFireballMetricRange(parsedResponse, metric) {
  if (!parsedResponse || parsedResponse.length === 0) {
    return [0, 0]
  }
  const minVal = minBy(parsedResponse, metric)
  const maxVal = maxBy(parsedResponse, metric)
  return [
    minVal ? Number(minVal[metric]) : 0,
    maxVal ? Number(maxVal[metric]) : 0,
  ]
}

export function getYearRange(parsedResponse) {
  if (!parsedResponse || parsedResponse.length === 0) {
    return [0, 0]
  }
  let items = parsedResponse.map((d) => parseJSON(d.date))
  return [
    Number(format(min(items), 'yyyy')),
    Number(format(max(items), 'yyyy')),
  ]
}
