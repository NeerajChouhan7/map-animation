  const coordinates = []

  async function getData() {
      console.log('in');
      const startPoints = await fetch('start_points.csv')
      const start_data = await startPoints.text()
      console.log('in');

      const rows1 = start_data.split('\n').slice(1);

      rows1.forEach(elt => {
          const row = elt.split(',');
          const start1 = row[0]
          const start2 = row[1]
          const end1 = row[2]
          const end2 = row[3]
          const speed = row[4]
          const delay = row[5]
          const color = row[6]
          coordinates.push([start1, start2, end1, end2, speed, delay, color])
      })

      console.log(coordinates);

  }

  var map = new Datamap({

      scope: 'world',
      element: document.getElementById('container'),
      projection: 'equirectangular',
      innerHeight: 'full',
      outerHeight: 'full',
      fills: {
          defaultFill: "#ABDDA4",
          gt50: '#e6e6e6',
          eq50: '#000000',
          lt25: '#111111',
          gt75: '#121211',
          lt50: '#999999',
          eq0: '#12c112',
          pink: '#0fa0fa',
          gt500: "#511231"
      },
      projectionConfig: {
          rotation: [100, -30]
      },
      data: {
          'USA': { fillKey: 'lt50' },
          'MEX': { fillKey: 'lt25' },
          'CAN': { fillKey: 'gt50' },
          'GTM': { fillKey: 'gt500' },
          'HND': { fillKey: 'eq50' },
          'BLZ': { fillKey: 'pink' },
          'GRL': { fillKey: 'eq0' },
          'CAN': { fillKey: 'gt50' }
      }

  });

  getData().then(() => {
      var arcs = []
      coordinates.forEach(elem => {
          arcs.push({
              origin: {
                  latitude: elem[0],
                  longitude: elem[1]
              },
              destination: {
                  latitude: elem[2],
                  longitude: elem[3]
              },
              options: {
                  animationSpeed: elem[4] * 1000,
                  strokeColor: elem[6],
              }
          })
      })


      map.arc(arcs, {
          animationSpeed: 2000,
          strokeWidth: 1.4,
          arcSharpness: 1,
          strokeDasharray: 5,
          addClass: 'dashed'
      })

  }).then(setTimeout(() => {
      var elems = document.getElementsByClassName('datamaps-arc')
      for (var i = 0; i <= elems.length; i++) {
          console.log(elems[i]);
          //   elems[i].style.transition = 'strokeDasharray 2000ms ease-out 0s';
          elems[i].style.strokeDasharray = 5;
          //   transition: stroke-dashoffset 2000ms ease-out 0s; stroke-dasharray: 5; stroke-dashoffset: 0;
      }
  }, 1000)).then(map.graticule())