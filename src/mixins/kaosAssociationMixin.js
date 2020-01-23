
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

export default {
  data() {
    return {
      refTypeOptions : {
        "goal,domainproperty" : [
          {'text' : 'And', 'value' : 'and'},
          {'text' : 'Or', 'value' : 'or'}
        ],
        "goal,goal" : [
          {'text' : 'And', 'value' : 'and'},
          {'text' : 'Or', 'value' : 'or'}
        ],
        "goal,obstacle" : [
          {'text' : 'Obstruct', 'value' : 'obstruct'}
        ],
        "goal,requirement" : [
          {'text' : 'And', 'value' : 'and'},
          {'text' : 'Or', 'value' : 'or'}
        ],
        "goal,role" : [
          {'text' : 'Responsible', 'value' : 'responsible'}
        ],
        "goal,task" : [
          {'text' : 'And', 'value' : 'and'}
        ],
        "goal,usecase" : [
          {'text' : 'And', 'value' : 'and'}
        ],
        "obstacle,domainproperty" : [
          {'text' : 'Resolve', 'value' : 'resolve'}
        ],
        "obstacle,goal" : [
          {'text' : 'Resolve', 'value' : 'resolve'}
        ],
        "obstacle,task" : [
          {'text' : 'And', 'value' : 'and'}
        ],
        "obstacle,misusecase" : [
          {'text' : 'And', 'value' : 'and'}
        ],
        "obstacle,obstacle" : [
          {'text' : 'And', 'value' : 'and'},
          {'text' : 'Or', 'value' : 'or'}
        ],
        "obstacle,requirement" : [
          {'text' : 'Resolve', 'value' : 'resolve'}
        ],
        "obstacle,role" : [
          {'text' : 'Responsible', 'value' : 'responsible'}
        ],
        "obstacle,threat" : [
          {'text' : 'And', 'value' : 'and'}
        ],
        "obstacle,usecase" : [
          {'text' : 'And', 'value' : 'and'}
        ],
        "obstacle,vulnerability" : [
          {'text' : 'And', 'value' : 'and'}
        ],
        "domainproperty,obstacle" : [
          {'text' : 'Obstruct', 'value' : 'obstruct'}
        ],
        "requirement,goal" : [
          {'text' : 'And', 'value' : 'and'},
          {'text' : 'Or', 'value' : 'or'}
        ],
        "requirement,requirement" : [
          {'text' : 'And', 'value' : 'and'},
          {'text' : 'Or', 'value' : 'or'}
        ],
        "requirement,role" : [
          {'text' : 'Responsible', 'value' : 'responsible'}
        ],
        "requirement,obstacle" : [
          {'text' : 'Obstruct', 'value' : 'obstruct'}
        ],
        "countermeasure,task" : [
          {'text' : 'And', 'value' : 'and'}
        ]
      }    
    }
  } 
}
