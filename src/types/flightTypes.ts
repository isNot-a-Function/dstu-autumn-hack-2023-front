export interface flightsData {
  flights: flightsDataItem[];
}

export interface flightsDataItem {
  arrivalPoint: string;
  arrivalTime: string;
  arrivalDate: string;
  departureDate: string;
  departurePoint: string;
  distance: number;
  flightPlaces: flightPlace[];
  freePlacesCount: {
    coupe: number;
    lux: number;
    reserved: number;
    restaurant: number;
    sitting: number;
    staff: number;
    sv: number;
  };
  train: { name: string };
  travelTime: number;
  id: number;
}

export interface flightPlace {
  id: number;
  place: Place;
  ticket: any;
  ticketId: any;
}

export interface Place {
  id: number;
  place: {
    carriage: {
      type: string;
    };
  };
  free: boolean;
  placeNumber: number;
  position: string;
  side: boolean;
}
