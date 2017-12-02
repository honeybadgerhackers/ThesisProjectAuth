const watchGetTrips = function* () {
  console.log('Fuckin\' sagas man');
}

// export watchGetTrips; 

const rootSaga = function* () {
 yield [
  watchGetTrips(),
 ];
};

export { watchGetTrips, rootSaga };
