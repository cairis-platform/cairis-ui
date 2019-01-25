/*  Licensed to the Apache Software Foundation (ASF) under one
    or more contributor license agreements.  See the NOTICE file
    distributed with this work for additional information
    regarding copyright ownership.  The ASF licenses this file
    to you under the Apache License, Version 2.0 (the
    "License"); you may not use this file except in compliance
    with the License.  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing,
    software distributed under the License is distributed on an
    "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, either express or implied.  See the License for the
    specific language governing permissions and limitations
    under the License.

    Authors: Shamal Faily */

import axios from 'axios';
import * as d3 from 'd3';
const chernoffModule = require('./chernoff');

export default {

  methods : {
    getRequirementLabels(data) {
      var lbls = [];
      d3.select(data).selectAll('a').each(function(d) {
        if (((d3.select(this).attr('xlink:href').indexOf('/api/requirements/shortcode') >= 0) && (d3.select(this).attr('xlink:title') != null)) || ((d3.select(this).attr('xlink:href').indexOf('/api/requirements/name') >= 0) && (d3.select(this).attr('xlink:title') != null)))  {
          lbls.push(d3.select(this).attr('xlink:title'));
          d3.select(this).attr('class','requirement');
        }
      });
      return lbls;
    },
    getRequirementLabel(url) {
      return axios.get(url)
    },
    replaceRequirementNodes(data,reqDict) {
      d3.select(data).selectAll('a').each(function(d) {
        if (((d3.select(this).attr('xlink:href').indexOf('/api/requirements/shortcode') >= 0) && (d3.select(this).attr('xlink:title') != null)) || ((d3.select(this).attr('xlink:href').indexOf('/api/requirements/name') >= 0) && (d3.select(this).attr('xlink:title') != null))) {
          var reqLabel = d3.select(this).attr('xlink:title');

          var labelY = d3.select(this).selectAll('text').attr('y');
          d3.select(this).selectAll('text').attr('y',labelY - 30);

          var cxi = d3.select(this).select('ellipse').attr('cx');
          var cyi = d3.select(this).select('ellipse').attr('cy');
          var ri = 25;
          d3.select(this).select('ellipse').remove();
          var svg = d3.select(this).attr("id","face" + reqLabel);
          var c = chernoffModule.chernoff()
              .xloc(function(d) { return d.cx; })
              .yloc(function(d) { return d.cy; })
              .frad(function(d) { return d.r; })
              .mouth(function(d) { return d.m; })
              .eyew(function(d) { return d.ew; })
              .eyeh(function(d) { return d.eh; })
              .brow(function(d) { return d.b; });

          var scObjt = reqDict[reqLabel];
          var dat = [{cx: cxi, cy: cyi, r: ri, m: scObjt.ambiguity, ew: scObjt.imperative[1], eh: scObjt.imperative[0], b: scObjt.completeness, face: svg}];

          svg.selectAll("g.chernoff").data(dat).enter()
             .append("svg:g")
             .attr("class", "chernoff")
             .call(c);
        }
      });
      this.displayModel();
    },
    getRequirementsScores(data,lbls) {
      var IMPERATIVES = ['shall','must','is required to','are applicable','are to','responsible for','will','should'];
      var OPTIONS = ['can','may','optionally'];
      var WEAKPHRASES = ['adequate','as appropriate','be able to','be capable of','capability of','capability to','effective','as required','normal','provide for','timely','easy to'];
      var FUZZY = ['mostly','as needed','might','make sense','appropriate','might make sense','graceful','at minimum','major','slowly','may be of use','including but not limited to','and/or','suitable','various','clean and stable interface','several'];
      var INCOMPLETES = ['TBD','TBS','TBE','TBC','TBR','not defined','not determined','but not limited to','as a minimum','None']

      var reqDict = {};

      var urlPrefix = this.$store.state.url + "/api/requirements/name/" ;
      var that = this;
      var promises = [];
      for (const reqLabel of lbls) {
        promises.push(this.getRequirementLabel(urlPrefix + reqLabel + "?session_id=" + that.$store.state.session))
      }
          
      axios.all(promises).then(function(results){
        results.forEach(function(response,idx){
          var req = response.data;
          var reqDesc = req.theDescription;
          var reqRat = req.theRationale;
          var reqFC = req.theFitCriterion;
          var reqOrig = req.theOriginator;

          var completeScore = 0;
          if (reqDesc == '') {
            completeScore += 1;
          }
          if (reqRat == '') {
            completeScore += 1;
          }
          if (reqFC == '') {
            completeScore += 1;
          }
          if (reqOrig == '') {
            completeScore += 1;
          }
          for (const w of INCOMPLETES) {
            if (reqDesc.indexOf(w) >= 0) {
              completeScore += 1;
            }
            if (reqRat.indexOf(w) >= 0) {
              completeScore += 1;
            }
            if (reqFC.indexOf(w) >= 0) {
              completeScore += 1;
            }
            if (reqOrig.indexOf(w) >= 0) {
              completeScore += 1;
            }
          }

          var impScore = 0;
          for (const w of IMPERATIVES){
            if (reqDesc.indexOf(w) > 0) {
              impScore += 1;
            }
          }

          var ambScore = 0;
          for (const w of OPTIONS.concat(WEAKPHRASES).concat(FUZZY)) {
            if (reqDesc.indexOf(w) > 0) {
              ambScore += 1;
            }
          }

          var scObjt = {};
          if (completeScore == 0) {
            scObjt.completeness = 2;
          }
          else if (completeScore == 1) {
            scObjt.completeness = 0;
          }
          else {
            scObjt.completeness = -2;
          }

          if (impScore == 0) {
            scObjt.imperative = [1,1];
          }
          else {
            scObjt.imperative = [1.5,0.5];
          }

          if (ambScore == 0) {
            scObjt.ambiguity = 2;
          }
          else if (ambScore < 2) {
            scObjt.ambiguity = 0;
          }
          else {
            scObjt.ambiguity = -2;
          }
          var reqLabel = lbls[idx];
          reqDict[reqLabel] = scObjt;
        })
      })
      .then(function() {
        that.replaceRequirementNodes(data,reqDict);
      })
    },
    updateRequirementsNodes() {
      var data = this.$el.querySelector('#svg-id');
      var lbls = this.getRequirementLabels(data);
      this.getRequirementsScores(data,lbls);
    }
  }
}