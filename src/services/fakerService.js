/**
 * @file Orders services
 * @author Daniela Cordoba
 */

import { faker } from "@faker-js/faker";
import { error, success} from '../utils/response.js';
import { setOrders } from '../db/ordersDb.js';
import { Status_Codes } from '../utils/constants.js';

// SEEDER
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  
let seedDB = async(req, res) => {
    try {
        // make a bunch of time series data
        let timeSeriesData = [];
  
        for (let i = 0; i < 50; i++) {
            let newOrder = {
                searchName: faker.string.alpha(10),
                requested: faker.date.past(),
                ordered: faker.date.anytime(),
                resultSent: faker.date.anytime(),
                ref: faker.string.alphanumeric({
                    casing: 'upper'
                }),
                buyers: [],
                sellers: [],
                propertyAddress: faker.location.streetAddress(),
                council: faker.location.state(),
                lot: faker.number.int({
                    min: 1,
                    max: 99
                }),
                plan: faker.number.int({
                    min: 100,
                    max: 9999
                }),
                planType: faker.string.alpha(2),
                price: faker.commerce.price({
                    min: 100000,
                    max: 3000000,
                    dec: 0,
                    symbol: '$'
                }),
                requestedBy: faker.company.name()
            };
  
            for (let j = 0; j < randomIntFromInterval(1, 6); j++) {
                let newBuyer = {
                    name: faker.person.fullName(),
                }
                let newSeller = {
                    name: faker.person.fullName(),
                }
                newOrder.buyers.push(newBuyer);
                newOrder.sellers.push(newSeller);
            }
            timeSeriesData.push(newOrder);
        }
          
        await setOrders(timeSeriesData);
        console.log("Database seeded! :)");
        return success(res, Status_Codes.Ok, 'Database seeded! :)');
    } 
    catch (err) {
        console.log(err);
        return error(res, Status_Codes.BadRequest, err);
    } 
}

export { seedDB }