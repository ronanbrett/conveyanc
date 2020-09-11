import { PropertyDto, PropertyPaged } from "@core/api/graphql";
import { getQueryRXJS } from "@core/utils/rxjs.utils";
import { RETRIEVE_PROPERTIES_PAGED } from "./Listings.queries";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";

const subject = new Subject();

export interface ListingStoreState {
  status: string;
  data: PropertyDto[];
  newDataCount: number;
  error: string;
}

const initialState: ListingStoreState = {
  status: "",
  data: [],
  newDataCount: 0,
  error: "",
};

let state: ListingStoreState = initialState;

export const ListingStore = {
  init: async () => {
    const data: PropertyPaged = await getQueryRXJS(RETRIEVE_PROPERTIES_PAGED, {
      first: 100,
      after: null,
    })
      .pipe(map((x) => x.propertiesPaged))
      .toPromise();

    state = {
      ...state,
      newDataCount: 0,
      data: (data?.properties as PropertyDto[]) ?? [],
    };

    subject.next(state);
  },
  subscribe: (setState: any) => subject.subscribe(setState),
  unsubscribe: () => subject.unsubscribe(),

  sendMessage: (message: any) => {
    state = {
      ...state,
      data: [...state.data, message],
      newDataCount: state.newDataCount + 1,
    };
    subject.next(state);
  },
  clearChat: () => {
    state = { ...state, data: [] };
    subject.next(state);
  },
  initialState,
};
