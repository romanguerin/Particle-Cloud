var settings = require('../core/settings');
var THREE = require('three');
var MeshMotionMaterial = require('./postprocessing/motionBlur/MeshMotionMaterial');

var undef;

exports.mesh = undef;
exports.init = init;

function init() {
    var geometry = new THREE.PlaneGeometry( 4000, 4000, 10, 10 );
    var mat1 = new THREE.MeshPhongMaterial( { color: 0x555555, specular: 0xffaa00, shininess: 4 } );
    /*var planeMaterial = new THREE.MeshStandardMaterial( {
        roughness: 0.7,
        metalness: 1.0,
        color: 0x333333,
        emissive: 0x000000
    });*/
    //var floor = exports.mesh = new THREE.Mesh( geometry, planeMaterial );
    var floor = exports.mesh = new THREE.Mesh( geometry, mat1 );

    floor.rotation.x = -1.57;
    floor.receiveShadow = true;




}
