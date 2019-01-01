export default {

testAsset : {
  theName : 'Clinical Data', 
  theType : 'Information',
  theShortCode : 'CD',
  theDescription: 'Clinical Data',
  theSignificance: 'Unanonymised and in the wrong hands, this could be very damaging.',
  isCritical: 0,
  theTags : [],
  theEnvironmentProperties : [
    {
      "theName" : "Psychosis",
      "theAssociations" : [
        {
          "theHeadNav": 0,
          "theHeadType" : "Association",
          "theHeadMultiplicity":"*",
          "theHeadRole": "",
          "theTailRole" : "",
          "theTailMultiplicity" :"*",
          "theTailNav" : 0,
          "theTailName" : "Cache"}
      ],
      "theProperties" : [
        {"name":"Confidentiality",
         "value":"High",
         "rationale":"Clinical data is partially anonymised."},
        {"name":"Integrity",
         "value":"None",
         "rationale":"None"},
        {"name":"Availability",
         "value":"None",
         "rationale":"None"},
        {"name":"Accountability",
         "value":"None",
         "rationale":"None"},
        {"name":"Anonymity",
         "value":"None",
         "rationale":"None"},
        {"name":"Pseudonymity",
         "value":"None",
         "rationale":"None"},
        {"name":"Unlinkability",
         "value":"None",
         "rationale":"None"},
        {"name":"Unobservability",
         "value":"None",
         "rationale":"None"}
      ]
    },
    {
      "theName" : "Stroke",
      "theAssociations" : [
        {"theHeadNav": 0,
         "theHeadType" : "Association",
         "theHeadMultiplicity":"*",
         "theHeadRole":"",
         "theTailRole" : "",
         "theTailMultiplicity" :"*",
         "theTailNav" : 0,
         "theTailName" : "Workflow"}
      ],
      "theProperties" : [
        {"name":"Confidentiality",
         "value":"Low",
         "rationale":"Clinical data is fully anonymised."},
        {"name":"Integrity",
         "value":"None",
         "rationale":"None"},
        {"name":"Availability",
         "value":"None",
         "rationale":"None"},
        {"name":"Accountability",
         "value":"None",
         "rationale":"None"},
        {"name":"Anonymity",
         "value":"None",
         "rationale":"None"},
        {"name":"Pseudonymity",
         "value":"None",
         "rationale":"None"},
        {"name":"Unlinkability",
         "value":"None",
         "rationale":"None"},
        {"name":"Unobservability",
         "value":"None",
         "rationale":"None"}
      ]
    }
  ]
}



}