export const mockedCarBrands = {

    'status': 'ok',
    'data': [
        {
            "id": 1, 
            "title": "Audi",
            "logoFilename": "audi.png"
        },
        
        {
            "id": 2, 
            "title": "BMW",
            "logoFilename": "bmw.png"
        },
    ]
}


export const mockedProfileData = {
    "status": "ok",
    "data": {
        "userId": 135220,
        "photoFilename": "default-user.png",
        "name": "Shako",
        "lastName": "Burako"
    }
}


export const expected = 
    {
        "status": "ok",
        "data": [
            {
                "id": 1,
                "title": "Audi",
                "logoFilename": "audi.png"
            },
            {
                "id": 2,
                "title": "BMW",
                "logoFilename": "bmw.png"
            },
            {
                "id": 3,
                "title": "Ford",
                "logoFilename": "ford.png"
            },
            {
                "id": 4,
                "title": "Porsche",
                "logoFilename": "porsche.png"
            },
            {
                "id": 5,
                "title": "Fiat",
                "logoFilename": "fiat.png"
            }
        ]
    }