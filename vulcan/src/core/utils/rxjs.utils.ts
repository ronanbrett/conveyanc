import { ASTNode, print } from 'graphql';
import gql from 'graphql-tag';
import { from } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
// import { webSocket } from 'rxjs/webSocket';

// const WS_GRAPHQL_CONNECTION = webSocket({
//   url: 'ws://localhost:6001/graphql',
//   protocol: 'graphql-ws',
// }).pipe(share());

const generateRequest = (query: ASTNode, variables?: unknown) =>
  fetch('https://localhost:6001/graphql', {
    method: 'POST',
    body: JSON.stringify({ query: print(query), variables }),
    headers: {
      'content-type': 'application/json',
    },
  } as Partial<RequestInit>);

export function getQueryRXJS(query: any, variables?: any) {
  return from(generateRequest(query, variables)).pipe(
    switchMap((x) => from(x.json())),
    map((x) => x.data),
    take(1)
  );
}

export function getEnumQueryRXJS(name: string) {
  const query = gql`
    query GET_ENUM($name: String!) {
      __type(name: $name) {
        name
        enumValues {
          name
        }
      }
    }
  `;

  return from(generateRequest(query, { name })).pipe(
    switchMap((x) => from(x.json())),
    map(
      (x: { data: { __type: { name: string; enumValues: { name: string }[] } } }) =>
        x.data['__type'].enumValues
    ),
    map((x) => x.map((x) => x.name)),
    tap((x) => console.log(x)),
    take(1)
  );
}

// export function getSubscription() {
//   return WS_GRAPHQL_CONNECTION;
// }
