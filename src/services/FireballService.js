import axios from 'axios'
import moment from 'moment'
import { cacheAdapterEnhancer } from 'axios-extensions'
import zipObject from 'lodash/zipObject'
import minBy from 'lodash/minBy'
import maxBy from 'lodash/maxBy'

const apiClient = axios.create({
  baseURL: 'https://ssd-api.jpl.nasa.gov/fireball.api?req-loc=true',
  //   baseURL: 'https://data.nasa.gov/resource/mc52-syum.json',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  adapter: cacheAdapterEnhancer(axios.defaults.adapter)
})

const fetchFireballs = () => {
  return apiClient.get()
}

const fetchFireballsForYearRange = yearRange => {
  return apiClient.get('', {
    params: {
      'date-min': `${yearRange[0]}-01-01`,
      'date-max': `${yearRange[1]}-12-31`
    }
  })
}

const parseResponse = response => {
  // Apply field labels to API response data into workable JSON
  // See formatting at https://ssd-api.jpl.nasa.gov/doc/fireball.html
  return response.data.map(fireball => {
    const updatedFireball = zipObject(response.fields, fireball)
    updatedFireball.lat =
      updatedFireball['lat-dir'] === 'N'
        ? Number(updatedFireball.lat)
        : -Number(updatedFireball.lat)
    updatedFireball.lon =
      updatedFireball['lon-dir'] === 'E'
        ? Number(updatedFireball.lon)
        : -Number(updatedFireball.lon)
    return updatedFireball
  })
}

const getFireballEnergyRange = parsedResponse => {
  return [
    Number(minBy(parsedResponse, 'energy')['energy']),
    Number(maxBy(parsedResponse, 'energy')['energy'])
  ]
}

const getFireballImpactRange = parsedResponse => {
  return [
    Number(minBy(parsedResponse, 'impact-e')['impact-e']),
    Number(maxBy(parsedResponse, 'impact-e')['impact-e'])
  ]
}

const getYearRange = parsedResponse => {
  let moments = parsedResponse.map(d => moment(d.date))
  return [
    Number(moment.min(moments).format('YYYY')),
    Number(moment.max(moments).format('YYYY'))
  ]
}

export default {
  fetchFireballs,
  fetchFireballsForYearRange,
  parseResponse,
  getFireballEnergyRange,
  getFireballImpactRange,
  getYearRange
}
