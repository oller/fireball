<template>
  <div class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-one-third">
          <h1 class="title">About fireballs</h1>
        </div>
        <div class="column">
          <div class="content">
            <p>
              Fireballs and bolides are astronomical terms for exceptionally
              bright meteors that are spectacular enough to to be seen over a
              very wide area
            </p>
            <p>
              A <a href="http://vuejs.org">Vue.js</a> case study leveraging
              NASA's
              <a
                href="https://ssd-api.jpl.nasa.gov/doc/fireball.html"
                target="new"
              >
                Fireball Data API
              </a>
              and Uber's <a href="http://deck.gl/" target="new">Deck.gl</a> to
              interrogate and display fireball and bolide events from around the
              earth.
            </p>
            <p>
              <strong>2022 Update:</strong> NASA has recently changed the CORS
              header policy for their public APIs making this tool unable to
              retrieve the data independently 😔. Until I find another data
              source this app is running from a snapshot
            </p>
            <p class="has-text-grey">Snapshot last updated: 14/02/2022</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
