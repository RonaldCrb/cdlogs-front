<template>
  <div>
    <v-container class="pa-5 ma-5">
      <v-row class="pa-5 ma-5">
        <v-col cols="12">
          <h1>UNDER CONSTRUCTION</h1>
          <h1>DO NOT USE THIS PACKAGE UNTIL STABLE VERSION HAS BEEN RELEASED!!!!!</h1>
        </v-col>

        <v-col cols="12">
          <h1>IMPORTANT NOTE FROM THE AUTHOR</h1>
          <p>
            this module is under construction, it is <span><mark>NOT</mark></span> suitable for usage in real 
            dive operations neither commercial nor recreational, as i need to make extensive 
            test and audit the package reliability. it is not only a matter of applying unit 
            testing as this calculations are crucial for divers safety; also regardless of 
            the extensive tests and trials in humans performed by the US Navy along the years
            with regards of decompression sickness, it has been stated many times by relevant 
            stakeholders that these trials do not necessarily entail 100% accuracy on the 
            results of undertaking a dive operations within the constraints of these dive 
            tables. there is many factors that are not taken into consideration (e.g: water 
            temperature, diver physiological fitness, unaverted PFOs... to name a few). 
          </p>
        </v-col>

        <v-col cols="12">
          <h1>Sources</h1>          
          <p>
            the main source for this module is the <a href="https://en.wikipedia.org/wiki/U.S._Navy_Diving_Manual"><mark>US Navy Diving Manual</mark></a>
            which is the most comprehensive resource for educational and operational reference in the diving industry.
            you can find a copy of the 7th revision of this manual in <a href="https://github.com/RonaldCrb/diving-decompression"><mark>this repository</mark></a> 
          </p>
        </v-col>
        <v-col cols="12">
          <h1>Installation</h1>
          <pre><code> $ npm i diving-decompression </code></pre>
        </v-col>
        <v-col>
          <h1>Usage</h1>
          <p>
            first you need your dive data to be in a configuration object; if you are diving a single dive, you must specify these
            parameters in the configuration object:
          </p>
          <ul>
            <li>
              <h3>depth</h3><p>number (depth of the dive expressed in feet of sea water)</p> 
            </li>
            <li>
              <h3>bottomTime</h3><p>number (the time from leaving surface to leaving bottom expressed in minutes)</p> 
            </li>
          </ul>
          <h3>diving-decompression exposes 3 methods compatible with this configuration object</h3>
        </v-col>
        <v-col cols="12">
         <p> To find the no-decompression-limit for air dives use:</p>
         <pre><code>import { noDecompressionLimit } from 'diving-decompression'
           ...
           const dive = { depth: 123, bottomTime: 15 };
           const ndl = noDecompressionLimit(dive);
           console.log(ndl)
         </code></pre>
        </v-col>

        <v-col cols="12">
         <p>To find the group letter use:</p>
         <pre><code>
            import { groupLetter } from 'diving-decompression'
            ...
            const dive = { depth: 123, bottomTime: 15 };
            const gl = groupLetter(dive);
            console.log(gl)
          </code></pre>
        </v-col>

        <v-col cols="12">
         <p>To find the decoObject use:</p>
         <pre><code>
            import { diveDeco } from 'diving-decompression'
            ...
            const dive = { depth: 100, bottomTime: 135 };
            const decoObject = diveDeco(dive);
            console.log(decoObject)
        </code></pre>
        </v-col>

        <v-col cols="12">
         <p>To find the decoObject use:</p>
         <pre><code>
            import { diveDeco } from 'diving-decompression'
            ...
            const dive = { depth: 100, bottomTime: 135 };
            const decoObject = diveDeco(dive);
            console.log(decoObject)
        </code></pre>
        <p>this  method returns an object with the following structure:</p>
          <pre><code>
{
  minTime: 101, 
  maxTime: 110,
  ttfs: '2:20', // Total time first stop (string)
  airTAT: '520:00', // in water decompression with Air Total Ascent time (string)
  o2TAT: '188:20', // in water decompression with Air/O2 Total Ascent time (string)
  o2cp: 5, // SurDO2 chamber periods required (number)
  repetLetter: 'N/A', // Repetitive Letter (string)
  surDo2Recom: true, // inWater Decompression or SurDO2 recommended (boolean)
  surDo2Req: true, // Exceptional Exposure, SurDO2 Required (boolean)
  strictlySurDo2: true, // Exceptional Exposure, Strictly SurDO2 (boolean)
  exceptionalExposure: true, // Exceptional Exposure, inWater Deco or SurDO2 Required (boolean)
  airDecoStops: [ // in Water decompression with Air Schedule
    { depth: 20, time: 433 }, // all air stops depth and time
    { depth: 30, time: 38 },
    { depth: 40, time: 25 },
    { depth: 50, time: 21 },
  ],
  o2decoStops: [ // in water decompression with Air/O2 Schedule (O2 for the 30' and 20')
    { depth: 20, time: 105 }, // O2 stop
    { depth: 30, time: 19 }, // O2 stop
    { depth: 40, time: 25 }, // air stop
    { depth: 50, time: 21 }, // air stop
  ],
},
</code></pre>
        </v-col>

        <v-col cols="12">
         <p>the other possible configuration object; if you are diving a repetitive dive, you must specify these parameters in the configuration object:</p>
         <ul>
            <li>
              <h3>depth</h3><p>number (depth of the dive expressed in feet of sea water)</p> 
            </li>
            <li>
              <h3>bottomTime</h3><p>number (the time from leaving surface to leaving bottom expressed in minutes)</p> 
            </li>
            <li>
              <h3>sit</h3><p>number (surface interval time expressed in minutes)</p> 
            </li>
            <li>
              <h3>nextDepth</h3><p>number (next planned depth expressed in feet of sea water)</p> 
            </li>
          </ul>
          <h3>diving-decompression exposes 2 methods compatible with this configuration object</h3>
        </v-col>
        <v-col cols="12">
         <p>To find the repetitive dive letter use:</p>
         <pre><code>
import { repetLetter } from 'diving-decompression'
...
const divePlan = { 
  depth: 123, 
  bottomTime: 15, 
  sit: 123,
  nextDepth: 321,
};
const rl = repetLetter(divePlan);
console.log(rl)
</code></pre>
        </v-col>

        <v-col cols="12">
         <p>To find the residual nitrogen time use:</p>
         <pre><code>
import { residualNitrogenTime } from 'diving-decompression'
...
const divePlan = { 
  depth: 123, 
  bottomTime: 123, 
  sit: 123,
  nextDepth: 123,
};
const rnt = residualNitrogenTime(divePlan);
console.log(rnt)
</code></pre>
        </v-col>
        <v-col cols="12">
          <h1>Road Map Specific Objectives</h1>
          <ol>
            <li>to develop a series of return objects with the specific guidelines that are relevant to the specific dive profile introduced.</li>
            <li>to develop a series of graphical charts to represent the decompression profiles.</li>
            <li>to develop a series of specific errors and warning objects relevant to the profile introduced.</li>
          </ol>
        </v-col>
        <v-col>
          <h1>License</h1>
          <p> <a href="https://choosealicense.com/licenses/mpl-2.0/"><mark>[MPL-2.0]</mark></a></p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>