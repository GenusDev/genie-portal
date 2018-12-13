import React from 'react';
import * as d3 from 'd3';

class ProjectVotes extends React.Component {
  constructor(props) {
    super(props);
  }


  render () {

    let d = [];
    let total = 0;
    let c1;
    let c2;
    let c3;

    for (let i = 86400; i <= 15777777; i = i + 86400) {
      let num = Math.floor(Math.random() * 1000000);

      total += num;

      let h = {
        [i]: total
      };
      d.push(h);
    }

    console.log(d);
    console.log(total);

    return (
      <div id='votes-graph'></div>
    )
  }
}

export default ProjectVotes;
const data = {
  weiHistory: [
    {86400: 501479},
    {172800: 1375876},
    {259200: 1499460},
    {345600: 1559440},
    {432000: 2485582},
    {518400: 3194069},
    {604800: 3876013},
    {691200: 4444190},
    {777600: 4448633},
    {864000: 4547845},
    {950400: 5007385},
    {1036800: 5334688},
    {1123200: 6311284},
    {1209600: 6674661},
    {1296000: 7317270},
    {1382400: 7966441},
    {1468800: 8563693},
    {1555200: 9074561},
    {1641600: 9831451},
    {1728000: 10358922},
    {1814400: 10547308},
    {1900800: 10738853},
    {1987200: 11618641},
    {2073600: 12498354},
    {2160000: 13014381},
    {2246400: 13871651},
    {2332800: 14097678},
    {2419200: 14489576},
    {2505600: 14992117},
    {2592000: 15080612},
    {2678400: 16034296},
    {2764800: 16754687},
    {2851200: 17477850},
    {2937600: 18247462},
    {3024000: 18645062},
    {3110400: 19044219},
    {3196800: 19939991},
    {3283200: 19978081},
    {3369600: 20256983},
    {3456000: 20784523},
    {3542400: 21301176},
    {3628800: 21410608},
    {3715200: 21733456},
    {3801600: 22011008},
    {3888000: 22692812},
    {3974400: 23029329},
    {4060800: 23206451},
    {4147200: 24014781},
    {4233600: 24260889},
    {4320000: 24940430},
    {4406400: 25626946},
    {4492800: 26239750},
    {4579200: 26511840},
    {4665600: 27004144},
    {4752000: 27200831},
    {4838400: 27926583},
    {4924800: 28658329},
    {5011200: 29069600},
    {5097600: 29919443},
    {5184000: 29983398},
    {5270400: 30233874},
    {5356800: 30452257},
    {5443200: 31191111},
    {5529600: 31869181},
    {5616000: 32579816},
    {5702400: 33214617},
    {5788800: 33752120},
    {5875200: 34201920},
    {5961600: 35023005},
    {6048000: 35194210},
    {6134400: 35716996},
    {6220800: 35915187},
    {6307200: 35915820},
    {6393600: 36256983},
    {6480000: 36644120},
    {6566400: 37000101},
    {6652800: 37587565},
    {6739200: 37617695},
    {6825600: 38501702},
    {6912000: 38929815},
    {6998400: 38992039},
    {7084800: 39841019},
    {7171200: 40185797},
    {7257600: 40572778},
    {7344000: 41002756},
    {7430400: 41863317},
    {7516800: 42657642},
    {7603200: 43404327},
    {7689600: 43446446},
    {7776000: 43910159},
    {7862400: 44715488},
    {7948800: 44943717},
    {8035200: 44984291},
    {8121600: 45949103},
    {8208000: 46575341},
    {8294400: 46700685},
    {8380800: 47460007},
    {8467200: 47936708},
    {8553600: 48740713},
    {8640000: 48937718},
     {8726400: 48982485},
     {8812800: 49023179},
     {8899200: 49556850},
     {8985600: 49577916},
     {9072000: 50174088},
     {9158400: 50455300},
     {9244800: 50505468},
     {9331200: 51361540},
     {9417600: 52112956},
     {9504000: 52934570},
     {9590400: 53406751},
     {9676800: 54007741},
     {9763200: 54594775},
     {9849600: 55026799},
     {9936000: 55434626},
     {10022400: 56271966},
     {10108800: 56425367},
     {10195200: 56454762},
     {10281600: 56465615},
     {10368000: 57003879},
     {10454400: 57297160},
     {10540800: 57922467},
     {10627200: 58591843},
     {10713600: 58724591},
     {10800000: 58958221},
     {10886400: 59090325},
     {10972800: 59917192},
     {11059200: 60896382},
     {11145600: 61312517},
     {11232000: 61799725},
     {11318400: 61912252},
     {11404800: 62542001},
     {11491200: 63279692},
     {11577600: 64081831},
     {11664000: 64691413},
     {11750400: 65230316},
     {11836800: 65354815},
     {11923200: 66076491},
     {12009600: 67044046},
     {12096000: 67348216},
     {12182400: 68073251},
     {12268800: 68384545},
     {12355200: 68701056},
     {12441600: 69514593},
     {12528000: 70334023},
     {12614400: 70914657},
     {12700800: 70919045},
     {12787200: 71034597},
     {12873600: 71923834},
     {12960000: 72173121},
     {13046400: 73007522},
     {13132800: 74005270},
     {13219200: 74162397},
     {13305600: 74369613},
     {13392000: 75023388},
     {13478400: 75879783},
     {13564800: 76498303},
     {13651200: 77469036},
     {13737600: 77828711},
     {13824000: 78540326},
     {13910400: 79066344},
     {13996800: 79655323},
     {14083200: 80355882},
     {14169600: 81277706},
     {14256000: 81395200},
     {14342400: 82227544},
     {14428800: 82543905},
     {14515200: 82600302},
     {14601600: 83593329},
     {14688000: 84185268},
     {14774400: 84676473},
     {14860800: 85272608},
     {14947200: 85517393},
     {15033600: 85838225},
     {15120000: 85941111},
     {15206400: 86234572},
     {15292800: 86901539},
     {15379200: 87795602},
     {15465600: 88652923},
     {15552000: 89443530},
     {15638400: 89470811},
     {15724800: 89882333}
  ],
  totalCapitalRaised: 89882333,
  currentWeiRaised: 20882333,
  activationHistory: {
    'proj1': {
        time: 3369600,
        deployedCap: 19000000
      },
    'proj2': {
        time: 6825600,
        deployedCap: 34000000
      },
    'proj3': {
        time: 13305600,
        deployedCap: 69000000
      }
    },
  pitchedProjects: [
    {name: 'proj3', capReq: 25000000, voteShare: .3},
    {name: 'proj4', capReq: 22000000, voteShare: .25},
    {name: 'proj5', capReq: 28000000, voteShare: .17},
    {name: 'proj6', capReq: 12000000, voteShare: .15},
    {name: 'proj7', capReq: 18000000, voteShare: .13},
  ]
};
// {
//   totalCapitalRaised: 20000000,
//   currentWeiRaised: 10000000,
//   totalTime: 15777777,
//   weiHistory: [
//     {0: },
//     {86400:},
//
//   ],
//
// }
