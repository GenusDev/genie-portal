module.exports = {
  overlay : {
    position        : 'fixed',
    top             : 0,
    left            : 0,
    right           : 0,
    bottom          : 0,
    backgroundColor : 'rgba(255, 255, 255, 0.75)',
    zIndex          : 10
  },
  //changes before demo, allow scrolling by adding overflow: auto
  content : {
    overflow        : 'auto',
    position        : 'fixed',
    width           : '320px',
    padding         : '10px',
    paddingBottom   : 0,
    right           : 0,
    borderRadius    : '0 0 0 15px',
    backgroundColor : '#4a7a7b',
    color           : 'white',
    maxHeight       : '100vh'
  },
};
