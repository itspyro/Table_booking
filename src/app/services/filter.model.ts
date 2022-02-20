export interface Filter {
  rating: number;
  private: boolean;
  pure_veg: boolean;
  cuisine: {
    Bengali: boolean;
    Chinese: boolean;
    Gujarati: boolean;
    Italian: boolean;
    Marathi: boolean;
    Mediterranean: boolean;
    PunjabiRasoi: boolean;
    SouthIndian: boolean;
  };
}
