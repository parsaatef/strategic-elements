var my_map_irn = new Datamap({
    element: document.getElementById("iran-map"),
    scope: 'irn',
    fills: {
      'Default': '#a4d05b',
      defaultFill: 'rgba(127, 154, 84, 0.5)' //the keys in this object map to the "fillKey" of [data] or [bubbles]
    },
    geographyConfig: {
        dataUrl: 'json/irn.topo.json', 
        borderWidth: 1,
        borderOpacity: 1,
        borderColor: 'transparent',
        popupOnHover: false, //disable the popup while hovering
        highlightOnHover: false,
        highlightFillColor: 'rgba(127, 154, 84, 0.8)',
        highlightBorderColor: 'transparent',
    },
    bubblesConfig: {
        borderColor: 'rgba(255,255,255, .4)',
        popupOnHover: true,
        highlightOnHover: true,
        highlightFillColor: '#a4d05b', 
        highlightBorderColor: 'transparent', 
    },
    setProjection: function (element) {
        var projection = d3.geo.mercator()
            .center([57.6880 , 32.4279]) // always in [East Latitude, North Longitude] 
            .scale(1400);
        var path = d3.geo.path().projection(projection);
        return { path: path, projection: projection };
    }       
});

my_map_irn.bubbles([
  {
    name: 'a2',
    radius: 8,
    centered: 'IR.TH', 
    state: 'Tehran',
    yeild: 0,
    fillKey: 'Default',
    date: '1954-03-01',
    latitude: 35.6864,
    longitude: 51.4328 
  },
  {
    name: 'a1',
    radius: 6,
    centered: 'IR.YA',  
    state: 'Yazd', 
    yeild: 0,
    fillKey: 'Default',
    date: '1954-03-01',
    latitude: 31.8944,
    longitude: 54.3695
  }
], {
  popupTemplate: function(geo, data) {
    return  '' +
            '<div id="popover" class="hoverinfo">' +
                '<div class="close"></div>' +
                '<ul>' +

                    '<li>' +
                        '<label class="state" id="state">استان: </label>' +
                        '<span class="" id="state-value">'  + data.state + '</span>' +
                    '</li>' + 

                    '<li>' +
                        '<label class="Rating" id="Rating">رتبه در تولید: </label>' +
                        '<span class="" id="Rating-value">33</span>' +
                    '</li>' + 

                    '<li>' +
                        '<label class="extraction" id="extraction"> extraction: </label>' +
                        '<span class="" id="extraction-value">33</span>' +
                    '</li>' + 

                    '<li>' +
                        '<label class="Production" id="Production"> Production: </label>' + 
                        '<span class="" id="Production-value">33</span>' + 
                    '</li>' +  

                    '<li>' +
                        '<label class="Production" id="Production"> Consumption: </label>' +  
                        '<span class="" id="Production-value">33</span>' + 
                    '</li>' +  

                    /*

                    '<li>' +
                        '<label class="ranking">' +
                            'Ranking:' +
                        '</label>' +
                        '<div class="ranking-scale">' +
                            '<span class="first-rank">1</span>' +
                            '<span class="last-rank">75</span>' +
                            '<div class="position" style="left: 17.3333%;"></div>' +
                        '</div>' +

                    '</li>' + */

                '</ul>' +
            '</div>';
  }
});