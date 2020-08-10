// hero.service.test.pact.js
import HeroService from './hero.service';
import * as Pact from '@pact-foundation/pact';
import Hero from './../hero';

describe('HeroService API', () => {

    const heroService = new HeroService('http://localhost', global.port);

    describe('createHero()', () => {

        beforeEach((done) => {
          const contentTypeJsonMatcher = Pact.Matchers.term({
            matcher: "application\\/json; *charset=utf-8",
            generate: "application/json; charset=utf-8"
          });

          // provider.verify() will check if all requests that have been
          // passed into addInteraction() earlier have been received
          // and will fail if any are missing.
          global.provider.addInteraction({
            state: 'provider allows hero creation',
            uponReceiving: 'a POST request to create a hero',
            // expected request
            withRequest: {
              method: 'POST',
              path: '/heroes',
              headers: {
                'Accept': 'application/json; charset=utf-8',
                'Content-Type': contentTypeJsonMatcher
              },
              body: new Hero('Superman', 'flying', 'DC', null)
            },
            // will respond this when expected request is received
            willRespondWith: {
              status: 201,
              headers: {
                'Content-Type': contentTypeJsonMatcher
              },
              // not expecting the response body to match exactly.
              body: Pact.Matchers.somethingLike(
                new Hero('Superman', 'flying', 'DC', 42))
            }
          }).then(() => done());
        });

        it('sends a request according to contract', (done) => {
          heroService.createHero(new Hero('Superman', 'flying', 'DC', null))
          .then(response => {
            const hero = response.data;
            expect(hero.id).toEqual(42);
          })
          .then(() => {
            global.provider.verify()
              .then(() => done(), error => {
                done.fail(error)
              })
          });
        });

    });

});