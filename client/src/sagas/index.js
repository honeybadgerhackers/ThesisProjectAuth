const watchGetTrips = function* () {
  console.log('Fuckin\' sagas man');
}

// export watchGetTrips; 

export default function* root() {
 yield [
  watchGetTrips(),
 ];
};
