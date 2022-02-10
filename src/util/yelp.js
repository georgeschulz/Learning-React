const { json } = require("mocha/lib/reporters");

const CLIENT_ID = 'Fk3E_STV-uS0n86ZDlIzNw'
const API_KEY = 't9Nlvb3HOLDYMHo6obnXk06VfH-Hf4AdquWMh6ozHALDSN59HkA9uoqXOPtNiC1eFLdQdTbk5hFqztNW-Mb_qHwVv8rvH8nRrudm8aDh1hIOgn5c65WqSuopsYb8YXYx'

const Yelp = {
    search(term, location, sortBy) {
        return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`,
        {
            headers: {
                Authorization: `Bearer ${API_KEY}`
            }
        }).then((response) => {
            return response.json();
        }).then((jsonResponse) => {
            if(jsonResponse.businesses) {
                return jsonResponse.businesses.map((business) => {
                    return {
                        id: business.id,
                        imageSrc: business["image_url"],
                        address: business.location.address,
                        city: business.location.city,
                        state: business.location.state,
                        zipCode: business.location["zip_code"],
                        category: business.categories.title,
                        ratings: business.rating,
                        reviewCount: business["review_count"]
                    }
                })
            }
        }); 
    }
}

export default Yelp;