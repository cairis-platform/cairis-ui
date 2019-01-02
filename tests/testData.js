const testData = { 
asset : {
  theName : 'Clinical Data', 
  theType : 'Information',
  theShortCode : 'CD',
  theDescription: 'Clinical Data',
  theSignificance: 'Unanonymised and in the wrong hands, this could be very damaging.',
  isCritical: 0,
  theCriticalRationale: "",
  theTags : [],
  theInterfaces : [{"theInterfaceName" : "if1","theInterfaceType" : "provided","theAccessRight" : "anonymous", "thePrivilege" : "normal"}],
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
         "value":"High",
         "rationale":"Don't touch this"},
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
         "theTailName" : "Workflow"},
        {"theHeadNav": 0,
         "theHeadType" : "Association",
         "theHeadMultiplicity":"*",
         "theHeadRole":"",
         "theTailRole" : "",
         "theTailMultiplicity" :"*",
         "theTailNav" : 0,
         "theTailName" : "Portal"},
        {"theHeadNav": 0,
         "theHeadType" : "Association",
         "theHeadMultiplicity":"*",
         "theHeadRole":"",
         "theTailRole" : "",
         "theTailMultiplicity" :"*",
         "theTailNav" : 0,
         "theTailName" : "SomeAsset"},
        {"theHeadNav": 0,
         "theHeadType" : "Association",
         "theHeadMultiplicity":"*",
         "theHeadRole":"",
         "theTailRole" : "",
         "theTailMultiplicity" :"*",
         "theTailNav" : 0,
         "theTailName" : "SomeOtherAsset"}
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
},
assets : [
  {asset: 'Corporate Network',type: 'Systems'},
  {asset: 'Diary Entry',type: 'Information'},
  {asset: 'Enterprise SCADA Network',type: 'Systems'}
],

svgModel : `<svg height="445pt" viewBox="0.00 0.00 579.25 445.00" width="579pt" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g class="graph" id="graph0" transform="scale(1 1) rotate(0) translate(4 441)">
  <title>G</title>
  <polygon fill="#ffffff" points="-4,4 -4,-441 575.2489,-441 575.2489,4 -4,4" stroke="transparent"/>
  <polygon fill="#ffffff" points="0,0 0,-433 571.17,-433 571.17,0 0,0" stroke="transparent"/>
  <g class="node" id="node1">
    <title>Clinical data</title>
    <g id="a_node1">
      <a xlink:href="/api/assets/name/Clinical%20data" xlink:title="\N">
        <polygon fill="none" points="25.7489,-164.5 25.7489,-201.5 104.7489,-201.5 104.7489,-164.5 25.7489,-164.5" stroke="#000000"/>
        <text fill="#000000" font-family="Times New Roman" font-size="13.00" text-anchor="middle" x="65.2489" y="-179.6">Clinical data</text>
      </a>
    </g>
  </g>
  <g class="node" id="node2">
    <title>User certificate</title>
    <g id="a_node2">
      <a xlink:href="/api/assets/name/User%20certificate" xlink:title="\N">
        <polygon fill="none" points="400.7489,-.5 400.7489,-37.5 497.7489,-37.5 497.7489,-.5 400.7489,-.5" stroke="#000000"/>
        <text fill="#000000" font-family="Times New Roman" font-size="13.00" text-anchor="middle" x="449.2489" y="-15.6">User certificate</text>
      </a>
    </g>
  </g>
  <g class="node" id="node3">
    <title>Access Control Policy</title>
    <g id="a_node3">
      <a xlink:href="/api/assets/name/Access%20Control%20Policy" xlink:title="\N">
        <polygon fill="none" points="388.2489,-282 388.2489,-319 522.2489,-319 522.2489,-282 388.2489,-282" stroke="#000000"/>
        <text fill="#000000" font-family="Times New Roman" font-size="13.00" text-anchor="middle" x="455.2489" y="-297.1">Access Control Policy</text>
      </a>
    </g>
  </g>
  <g class="node" id="node4">
    <title>Analysis data</title>
    <g id="a_node4">
      <a xlink:href="/api/assets/name/Analysis%20data" xlink:title="\N">
        <polygon fill="none" points="182.2489,-82.5 182.2489,-119.5 268.2489,-119.5 268.2489,-82.5 182.2489,-82.5" stroke="#000000"/>
        <text fill="#000000" font-family="Times New Roman" font-size="13.00" text-anchor="middle" x="225.2489" y="-97.6">Analysis data</text>
      </a>
    </g>
  </g>
  <g class="node" id="node5">
    <title>Guest Certificate</title>
    <g id="a_node5">
      <a xlink:href="/api/assets/name/Guest%20Certificate" xlink:title="\N">
        <polygon fill="none" points="135.2489,-.5 135.2489,-37.5 243.2489,-37.5 243.2489,-.5 135.2489,-.5" stroke="#000000"/>
        <text fill="#000000" font-family="Times New Roman" font-size="13.00" text-anchor="middle" x="189.2489" y="-15.6">Guest Certificate</text>
      </a>
    </g>
  </g>
  <g class="node" id="node6">
    <title>WebDAV Collection</title>
    <g id="a_node6">
      <a xlink:href="/api/assets/name/WebDAV%20Collection" xlink:title="\N">
        <polygon fill="none" points="118.2489,-282 118.2489,-319 240.2489,-319 240.2489,-282 118.2489,-282" stroke="#000000"/>
        <text fill="#000000" font-family="Times New Roman" font-size="13.00" text-anchor="middle" x="179.2489" y="-297.1">WebDAV Collection</text>
      </a>
    </g>
  </g>
  <g class="node" id="node7">
    <title>WebDAV Resource</title>
    <g id="a_node7">
      <a xlink:href="/api/assets/name/WebDAV%20Resource" xlink:title="\N">
        <polygon fill="none" points="122.7489,-164.5 122.7489,-201.5 239.7489,-201.5 239.7489,-164.5 122.7489,-164.5" stroke="#000000"/>
        <text fill="#000000" font-family="Times New Roman" font-size="13.00" text-anchor="middle" x="181.2489" y="-179.6">WebDAV Resource</text>
      </a>
    </g>
  </g>
  <g class="edge" id="edge1">
    <title>WebDAV Collection-&gt;WebDAV Resource</title>
    <path d="M179.7729,-269.7141C180.1414,-248.0638 180.6224,-219.8055 180.9334,-201.5311" fill="none" stroke="#000000"/>
    <polygon fill="#000000" points="179.7701,-269.8835 183.6673,-275.9508 179.5658,-281.8818 175.6685,-275.8145 179.7701,-269.8835" stroke="#000000"/>
    <text fill="#000000" font-family="Times,serif" font-size="7.50" text-anchor="middle" x="181.7489" y="-222"> </text>
    <text fill="#000000" font-family="Times,serif" font-size="7.50" text-anchor="middle" x="172.4334" y="-203.5311">1..*  </text>
    <text fill="#000000" font-family="Times,serif" font-size="7.50" text-anchor="middle" x="175.0658" y="-275.8818">1  </text>
  </g>
  <g class="edge" id="edge2">
    <title>WebDAV Resource-&gt;Analysis data</title>
    <path d="M196.074,-155.3712C202.4064,-143.57 209.6293,-130.1091 215.3041,-119.5334" fill="none" stroke="#000000"/>
    <polygon fill="none" points="192.8773,-153.9264 191.2331,-164.3929 199.0454,-157.2362 192.8773,-153.9264" stroke="#000000"/>
    <text fill="#000000" font-family="Times,serif" font-size="7.50" text-anchor="middle" x="205.7489" y="-140"> </text>
    <text fill="#000000" font-family="Times,serif" font-size="7.50" text-anchor="middle" x="213.8041" y="-121.5334"> </text>
    <text fill="#000000" font-family="Times,serif" font-size="7.50" text-anchor="middle" x="189.7331" y="-158.3929"> </text>
  </g>
  <g class="node" id="node8">
    <title>Personal certificate</title>
    <g id="a_node8">
      <a xlink:href="/api/assets/name/Personal%20certificate" xlink:title="\N">
        <polygon fill="none" points="261.7489,-.5 261.7489,-37.5 382.7489,-37.5 382.7489,-.5 261.7489,-.5" stroke="#000000"/>
        <text fill="#000000" font-family="Times New Roman" font-size="13.00" text-anchor="middle" x="322.2489" y="-15.6">Personal certificate</text>
      </a>
    </g>
  </g>
  <g class="node" id="node9">
    <title>Portal</title>
    <g id="a_node9">
      <a xlink:href="/api/assets/name/Portal" xlink:title="\N">
        <polygon fill="none" points="516.2489,-.5 516.2489,-37.5 570.2489,-37.5 570.2489,-.5 516.2489,-.5" stroke="#000000"/>
        <text fill="#000000" font-family="Times New Roman" font-size="13.00" text-anchor="middle" x="543.2489" y="-15.6">Portal</text>
      </a>
    </g>
  </g>
  <g class="node" id="node10">
    <title>Web-browser</title>
    <g id="a_node10">
      <a xlink:href="/api/assets/name/Web-browser" xlink:title="\N">
        <polygon fill="none" points="398.2489,-82.5 398.2489,-119.5 482.2489,-119.5 482.2489,-82.5 398.2489,-82.5" stroke="#000000"/>
        <text fill="#000000" font-family="Times New Roman" font-size="13.00" text-anchor="middle" x="440.2489" y="-97.6">Web-browser</text>
      </a>
    </g>
  </g>
  <g class="edge" id="edge3">
    <title>Web-browser-&gt;User certificate</title>
    <path d="M443.6315,-70.1801C444.8373,-59.194 446.1574,-47.1667 447.2147,-37.5334" fill="none" stroke="#000000"/>
    <polygon fill="none" points="443.6004,-70.4646 446.9219,-76.8652 442.2911,-82.3929 438.9696,-75.9923 443.6004,-70.4646" stroke="#000000"/>
    <text fill="#000000" font-family="Times,serif" font-size="7.50" text-anchor="middle" x="445.7489" y="-58"> </text>
    <text fill="#000000" font-family="Times,serif" font-size="7.50" text-anchor="middle" x="442.7147" y="-39.5334">1  </text>
    <text fill="#000000" font-family="Times,serif" font-size="7.50" text-anchor="middle" x="437.7911" y="-76.3929">1  </text>
  </g>
  <g class="edge" id="edge4">
    <title>Web-browser-&gt;Guest Certificate</title>
    <path d="M386.8102,-83.5419C344.6583,-69.7712 286.1026,-50.6415 243.6928,-36.7865" fill="none" stroke="#000000"/>
    <polygon fill="none" points="386.8304,-83.5485 393.7759,-81.6095 398.2371,-87.275 391.2916,-89.214 386.8304,-83.5485" stroke="#000000"/>
    <text fill="#000000" font-family="Times,serif" font-size="7.50" text-anchor="middle" x="323.7489" y="-58"> </text>
    <text fill="#000000" font-family="Times,serif" font-size="7.50" text-anchor="middle" x="248.1928" y="-38.7865">1  </text>
    <text fill="#000000" font-family="Times,serif" font-size="7.50" text-anchor="middle" x="393.7371" y="-89.275">1  </text>
  </g>
  <g class="edge" id="edge5">
    <title>Web-browser-&gt;Personal certificate</title>
    <path d="M403.4903,-75.4559C385.8243,-63.1795 365.0417,-48.7374 348.9189,-37.5334" fill="none" stroke="#000000"/>
    <polygon fill="none" points="403.6185,-75.545 410.8283,-75.6842 413.4728,-82.3929 406.2631,-82.2537 403.6185,-75.545" stroke="#000000"/>
    <text fill="#000000" font-family="Times,serif" font-size="7.50" text-anchor="middle" x="385.7489" y="-58"> </text>
    <text fill="#000000" font-family="Times,serif" font-size="7.50" text-anchor="middle" x="344.4189" y="-39.5334">1  </text>
    <text fill="#000000" font-family="Times,serif" font-size="7.50" text-anchor="middle" x="408.9728" y="-76.3929">1  </text>
  </g>
  <g class="edge" id="edge6">
    <title>Web-browser-&gt;Portal</title>
    <path d="M463.6212,-82.3929C480.4777,-68.9731 503.1338,-50.9363 519.9691,-37.5334" fill="none" stroke="#000000"/>
    <text fill="#000000" font-family="Times,serif" font-size="7.50" text-anchor="middle" x="495.7489" y="-58"> </text>
    <text fill="#000000" font-family="Times,serif" font-size="7.50" text-anchor="middle" x="515.4691" y="-39.5334">*  </text>
    <text fill="#000000" font-family="Times,serif" font-size="7.50" text-anchor="middle" x="459.1212" y="-76.3929">*  </text>
  </g>
  <g class="node" id="node11">
    <title>Workflow</title>
    <g id="a_node11">
      <a xlink:href="/api/assets/name/Workflow" xlink:title="\N">
        <polygon fill="none" points="1.7489,-282 1.7489,-319 60.7489,-319 60.7489,-282 1.7489,-282" stroke="#000000"/>
        <text fill="#000000" font-family="Times New Roman" font-size="13.00" text-anchor="middle" x="31.2489" y="-297.1">Workflow</text>
      </a>
    </g>
  </g>
  <g class="edge" id="edge7">
    <title>Workflow-&gt;Clinical data</title>
    <path d="M36.6363,-281.8818C43.0027,-259.8802 53.5313,-223.4947 59.8867,-201.5311" fill="none" stroke="#000000"/>
    <text fill="#000000" font-family="Times,serif" font-size="7.50" text-anchor="middle" x="56.7489" y="-222"> </text>
    <text fill="#000000" font-family="Times,serif" font-size="7.50" text-anchor="middle" x="51.3867" y="-203.5311">1..*  </text>
    <text fill="#000000" font-family="Times,serif" font-size="7.50" text-anchor="middle" x="32.1363" y="-275.8818">*  </text>
  </g>
  <g class="edge" id="edge8">
    <title>Workflow-&gt;Analysis data</title>
    <path d="M21.0853,-281.6178C7.3073,-253.15 -12.7651,-198.8689 13.2489,-164 33.4536,-136.9177 126.08,-117.2962 181.9983,-107.6776" fill="none" stroke="#000000"/>
    <text fill="#000000" font-family="Times,serif" font-size="7.50" text-anchor="middle" x="14.7489" y="-181"> </text>
    <text fill="#000000" font-family="Times,serif" font-size="7.50" text-anchor="middle" x="173.4983" y="-109.6776">1..*  </text>
    <text fill="#000000" font-family="Times,serif" font-size="7.50" text-anchor="middle" x="12.5853" y="-275.6178">1..*  </text>
  </g>
  <g class="node" id="node12">
    <title>Client workstation</title>
    <g id="a_node12">
      <a xlink:href="/api/assets/name/Client%20workstation" xlink:title="\N">
        <polygon fill="none" points="335.7489,-164.5 335.7489,-201.5 452.7489,-201.5 452.7489,-164.5 335.7489,-164.5" stroke="#000000"/>
        <text fill="#000000" font-family="Times New Roman" font-size="13.00" text-anchor="middle" x="394.2489" y="-179.6">Client workstation</text>
      </a>
    </g>
  </g>
  <g class="edge" id="edge9">
    <title>Client workstation-&gt;Web-browser</title>
    <path d="M410.7377,-153.6069C417.1118,-142.2443 424.213,-129.5856 429.8521,-119.5334" fill="none" stroke="#000000"/>
    <polygon fill="#000000" points="410.558,-153.9272 411.1111,-161.1171 404.687,-164.3929 404.1339,-157.203 410.558,-153.9272" stroke="#000000"/>
    <text fill="#000000" font-family="Times,serif" font-size="7.50" text-anchor="middle" x="419.7489" y="-140"> </text>
    <text fill="#000000" font-family="Times,serif" font-size="7.50" text-anchor="middle" x="421.3521" y="-121.5334">1..*  </text>
    <text fill="#000000" font-family="Times,serif" font-size="7.50" text-anchor="middle" x="396.187" y="-158.3929">1..*  </text>
  </g>
  <g class="node" id="node13">
    <title>Data node</title>
    <g id="a_node13">
      <a xlink:href="/api/assets/name/Data%20node" xlink:title="\N">
        <polygon fill="none" points="212.2489,-399.5 212.2489,-436.5 278.2489,-436.5 278.2489,-399.5 212.2489,-399.5" stroke="#000000"/>
        <text fill="#000000" font-family="Times New Roman" font-size="13.00" text-anchor="middle" x="245.2489" y="-414.6">Data node</text>
      </a>
    </g>
  </g>
  <g class="edge" id="edge10">
    <title>Data node-&gt;Clinical data</title>
    <path d="M200.2731,-408.6123C169.4143,-399.8599 129.9111,-383.6915 106.2489,-355 86.8639,-331.4949 72.8903,-241.0294 67.5911,-201.5764" fill="none" stroke="#000000"/>
    <polygon fill="#000000" points="200.4445,-408.6575 207.2662,-406.3199 212.0477,-411.7178 205.226,-414.0554 200.4445,-408.6575" stroke="#000000"/>
    <text fill="#000000" font-family="Times,serif" font-size="7.50" text-anchor="middle" x="107.7489" y="-298.5"> </text>
    <text fill="#000000" font-family="Times,serif" font-size="7.50" text-anchor="middle" x="76.0911" y="-203.5764">1..*  </text>
    <text fill="#000000" font-family="Times,serif" font-size="7.50" text-anchor="middle" x="207.5477" y="-413.7178">1  </text>
  </g>
  <g class="edge" id="edge11">
    <title>Data node-&gt;Access Control Policy</title>
    <path d="M289.5934,-399.5941C316.2037,-387.9552 350.3777,-371.9471 379.2489,-355 397.5918,-344.2328 417.063,-330.214 431.7045,-319.0909" fill="none" stroke="#000000"/>
    <polygon fill="#000000" points="289.3351,-399.7056 285.4126,-405.7565 278.3184,-404.463 282.2409,-398.4121 289.3351,-399.7056" stroke="#000000"/>
    <text fill="#000000" font-family="Times,serif" font-size="7.50" text-anchor="middle" x="344.7489" y="-375"> </text>
    <text fill="#000000" font-family="Times,serif" font-size="7.50" text-anchor="middle" x="427.2045" y="-321.0909">1  </text>
    <text fill="#000000" font-family="Times,serif" font-size="7.50" text-anchor="middle" x="282.8184" y="-406.463">1  </text>
  </g>
  <g class="edge" id="edge12">
    <title>Data node-&gt;Analysis data</title>
    <path d="M249.5827,-387.3408C255.5169,-339.2754 263.8721,-243.4632 249.2489,-164 246.3891,-148.4602 239.8713,-131.7902 234.3488,-119.5036" fill="none" stroke="#000000"/>
    <polygon fill="none" points="249.5741,-387.4074 252.7694,-393.872 248.031,-399.3078 244.8358,-392.8433 249.5741,-387.4074" stroke="#000000"/>
    <text fill="#000000" font-family="Times,serif" font-size="7.50" text-anchor="middle" x="257.7489" y="-222"> </text>
    <text fill="#000000" font-family="Times,serif" font-size="7.50" text-anchor="middle" x="225.8488" y="-121.5036">1..*  </text>
    <text fill="#000000" font-family="Times,serif" font-size="7.50" text-anchor="middle" x="243.531" y="-393.3078">1  </text>
  </g>
  <g class="edge" id="edge13">
    <title>Data node-&gt;WebDAV Collection</title>
    <path d="M228.8065,-388.7276C216.5436,-366.896 200.1635,-337.7345 189.6578,-319.0311" fill="none" stroke="#000000"/>
    <polygon fill="#000000" points="228.9141,-388.9193 235.34,-392.1916 234.791,-399.3818 228.365,-396.1095 228.9141,-388.9193" stroke="#000000"/>
    <text fill="#000000" font-family="Times,serif" font-size="7.50" text-anchor="middle" x="224.7489" y="-375"> </text>
    <text fill="#000000" font-family="Times,serif" font-size="7.50" text-anchor="middle" x="181.1578" y="-321.0311">1..*  </text>
    <text fill="#000000" font-family="Times,serif" font-size="7.50" text-anchor="middle" x="230.291" y="-393.3818">1  </text>
  </g>
  <g class="edge" id="edge14">
    <title>Data node-&gt;Portal</title>
    <path d="M290.4443,-412.1853C360.7766,-402.4582 492.3878,-381.3357 531.2489,-355 555.4847,-338.5756 568.2489,-329.7769 568.2489,-300.5 568.2489,-300.5 568.2489,-300.5 568.2489,-101 568.2489,-78.5266 559.551,-54.0357 552.416,-37.7262" fill="none" stroke="#000000"/>
    <polygon fill="#000000" points="290.3624,-412.1963 284.9559,-416.9681 278.4718,-413.8128 283.8783,-409.041 290.3624,-412.1963" stroke="#000000"/>
    <text fill="#000000" font-family="Times,serif" font-size="7.50" text-anchor="middle" x="569.7489" y="-181"> </text>
    <text fill="#000000" font-family="Times,serif" font-size="7.50" text-anchor="middle" x="547.916" y="-39.7262">1  </text>
    <text fill="#000000" font-family="Times,serif" font-size="7.50" text-anchor="middle" x="282.9718" y="-415.8128">1  </text>
  </g>
  <g class="edge" id="edge15">
    <title>Data node-&gt;Workflow</title>
    <path d="M200.1605,-411.9275C158.1379,-405.5581 99.1915,-394.5892 80.2489,-381 58.8453,-365.6454 44.9828,-337.7644 37.6417,-319.186" fill="none" stroke="#000000"/>
    <polygon fill="none" points="200.1832,-411.9308 206.7016,-408.8467 212.0555,-413.6774 205.5372,-416.7615 200.1832,-411.9308" stroke="#000000"/>
    <text fill="#000000" font-family="Times,serif" font-size="7.50" text-anchor="middle" x="81.7489" y="-375"> </text>
    <text fill="#000000" font-family="Times,serif" font-size="7.50" text-anchor="middle" x="29.1417" y="-321.186">1..*  </text>
    <text fill="#000000" font-family="Times,serif" font-size="7.50" text-anchor="middle" x="207.5555" y="-407.6774">*  </text>
  </g>
  <g class="node" id="node14">
    <title>Claire</title>
    <g id="a_node14">
      <a xlink:href="/api/personas/name/Claire" xlink:title="Claire">
        <image height="109px" preserveAspectRatio="xMinYMin meet" width="56px" x="314.249" xlink:href="data:image/png;base64,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" y="-355"/>
        <text fill="#000000" font-family="Times New Roman" font-size="13.00" text-anchor="middle" x="342.2489" y="-297.1">Claire</text>
      </a>
    </g>
  </g>
  <g class="edge" id="edge16">
    <title>Claire-&gt;Clinical data</title>
    <path d="M314.0587,-256.0075C303.0375,-242.2192 289.1898,-228.4434 273.2489,-220 210.012,-186.5054 182.6808,-219.3204 113.2489,-202 110.4662,-201.3058 107.6291,-200.4883 104.7948,-199.5892" fill="none" stroke="#000000"/>
    <text fill="#000000" font-family="Times,serif" font-size="7.50" text-anchor="middle" x="286.7489" y="-222"> </text>
    <text fill="#000000" font-family="Times,serif" font-size="7.50" text-anchor="middle" x="106.2948" y="-201.5892"> </text>
    <text fill="#000000" font-family="Times,serif" font-size="7.50" text-anchor="middle" x="312.5587" y="-258.0075"> </text>
  </g>
  <g class="edge" id="edge17">
    <title>Claire-&gt;Analysis data</title>
    <path d="M331.3021,-245.6451C322.4428,-211.8826 307.2237,-169.2422 282.2489,-138 276.5765,-130.9042 269.1597,-124.7296 261.561,-119.564" fill="none" stroke="#000000"/>
    <text fill="#000000" font-family="Times,serif" font-size="7.50" text-anchor="middle" x="317.7489" y="-181"> </text>
    <text fill="#000000" font-family="Times,serif" font-size="7.50" text-anchor="middle" x="260.061" y="-121.564"> </text>
    <text fill="#000000" font-family="Times,serif" font-size="7.50" text-anchor="middle" x="329.8021" y="-239.6451"> </text>
  </g>
  <g class="edge" id="edge18">
    <title>Claire-&gt;Portal</title>
    <path d="M370.3263,-253.7279C373.1088,-250.8815 376.0849,-248.2602 379.2489,-246 403.9891,-228.3261 418.4243,-242.3138 445.2489,-228 460.8153,-219.6936 465.1957,-216.4997 475.2489,-202 512.3275,-148.5214 532.0382,-72.3232 539.5761,-37.5665" fill="none" stroke="#000000"/>
    <text fill="#000000" font-family="Times,serif" font-size="7.50" text-anchor="middle" x="509.7489" y="-140"> </text>
    <text fill="#000000" font-family="Times,serif" font-size="7.50" text-anchor="middle" x="538.0761" y="-39.5665"> </text>
    <text fill="#000000" font-family="Times,serif" font-size="7.50" text-anchor="middle" x="371.8263" y="-247.7279"> </text>
  </g>
  <g class="edge" id="edge19">
    <title>Claire-&gt;Web-browser</title>
    <path d="M370.4679,-255.0193C373.2485,-251.8015 376.1834,-248.7483 379.2489,-246 410.3358,-218.1286 440.7229,-237.7749 462.2489,-202 477.7003,-176.3206 463.6303,-141.164 451.9797,-119.8229" fill="none" stroke="#000000"/>
    <text fill="#000000" font-family="Times,serif" font-size="7.50" text-anchor="middle" x="469.7489" y="-181"> </text>
    <text fill="#000000" font-family="Times,serif" font-size="7.50" text-anchor="middle" x="450.4797" y="-121.8229"> </text>
    <text fill="#000000" font-family="Times,serif" font-size="7.50" text-anchor="middle" x="371.9679" y="-257.0193"> </text>
  </g>
  <g class="edge" id="edge20">
    <title>Claire-&gt;Client workstation</title>
    <path d="M366.4221,-245.8778C373.477,-229.9363 380.7123,-213.5875 386.0362,-201.5574" fill="none" stroke="#000000"/>
    <text fill="#000000" font-family="Times,serif" font-size="7.50" text-anchor="middle" x="378.7489" y="-222"> </text>
    <text fill="#000000" font-family="Times,serif" font-size="7.50" text-anchor="middle" x="384.5362" y="-203.5574"> </text>
    <text fill="#000000" font-family="Times,serif" font-size="7.50" text-anchor="middle" x="364.9221" y="-239.8778"> </text>
  </g>
</g>
</svg>`
}


export default testData;