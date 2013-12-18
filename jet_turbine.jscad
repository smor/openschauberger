// Jet Turbine
// Copyright 2013 - Stéphane Mor
// Created by Stéphane Mor <stephanemor@gmail.com>
// Objects created with this application are licensed under the Creative Commons license (CC-BY-SA).

// Main loop
function main(params)
{
  var diametre = 30;
  var hauteur = params.hauteur;
  var contour = circle({r: diametre/2, center: true}).scale([0.5,1]);
  //contour = contour.subtract(circle({r: diametre/2 - 2, center: true}));
  //contour = contour.union(circle({r: diametre/4, center: true}).translate([diametre/2, 0,0]));
  //contour = contour.union(circle({r: diametre/4, center: true}).translate([-diametre/2, 0,0]));

  //contour = square(10).center([true, true]);

  var chemin = contour.getOutlinePaths()[0];
  var base = CSG.Polygon.createFromPoints(chemin.points);
  var tube = base.solidFromSlices({
    numslices: 40,
    callback: function(t, slice){
      return this.scale(1 - 0.80*t).rotateZ(360*t).translate([0,0,t*hauteur]);
    }
  });
  tube = tube.union(tube.rotateZ(90));
  tube = cylinder({r1: diametre/2 + 4, r2: 5, h: 100, center: true}).translate([0,0,50]).subtract(tube).translate([0,0,20]);
  tube = tube.union(cylinder({r: diametre/2+4, h: 20, center: true}).subtract(cylinder({r: diametre/2, h:20, center:true})).translate([0,0,10]));
  tube = tube.subtract(cube(diametre + 10).center([true, true]).translate([0,0,100]));
  return tube;
}

// User parameters
function getParameterDefinitions() {
  return [
    // Parties à imprimer
    { name: 'hauteur', type: 'float', caption: 'Hauteur', default: 100 },
  ];
}

function jetTurbine(dExt, dInt, hauteur){
} 
