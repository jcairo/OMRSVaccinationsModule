'use strict';

angular.module('mockData', [])
.value('mockObjects', {
    vaccinations:[
    {
      "_id": "54f88ccdfb16c75e35261900",
      "_vaccine_id": "550b46047fcba390ff335aaa",
      "routine": true,
      "name": "Bacillus Calmette-Guerin",
      "indication": "Birth to 1 yo",
      "dose": 0.05,
      "dosing_unit": "ml",
      "route": "intra-dermal",
      "administered": true,
      "adverse_reaction": false,
      "administration_date": "2014-10-01",
      "scheduled_date": "2014-09-05",
      "body_site_administered": "left forearm",
      "dose_number": 1,
      "manufacturer": "P. Corp.",
      "lot_number": 1000,
      "manufacture_date": "2014-01-01",
      "expiry_date": "2016-01-01"
    },
    {
      "_vaccine_id": "550b46047fcba390ff335bba",
      "routine": true,
      "name": "Bacillus Calmette-Guerin",
      "indication": "Older than 1 yo",
      "dose": 0.1,
      "dosing_unit": "ml",
      "route": "intra-dermal",
      "administered": false,
      "adverse_reaction": false,
      "administration_date": "",
      "scheduled_date": "2015-09-05",
      "body_site_administered": "left forearm",
      "dose_number": 2,
    },
    {
      "_id": "54f88ccdfb16c75e35261802",
      "_vaccine_id": "550b46047fcba390ff335cca",
      "routine": true,
      "name": "Polio",
      "indication": "Birth to 2 weeks",
      "dose": 2,
      "dosing_unit": "drops",
      "route": "PO",
      "administered": true,
      "adverse_reaction": false,
      "administration_date": "2014-09-01",
      "scheduled_date": "2014-09-01",
      "body_site_administered": "Site",
      "dose_number": 1,
      "manufacturer": "P. Corp.",
      "lot_number": 1000,
      "manufacture_date": "2014-01-01",
      "expiry_date": "2016-01-01"
    },
    {
      "_id": "54f88ccd6bba27070e77d3dc",
      "_vaccine_id": "4aslkjlkjaslkfjlkah234ql",
      "routine": false,
      "provider_id": "AAAA",
      "name": "Rotavirus",
      "dose": 0.1,
      "dosing_unit": "ml",
      "route": "",
      "administered": true,
      "adverse_reaction": false,
      "administration_date": "2014-10-01",
      "scheduled_date": "2014-10-01",
      "body_site_administered": "",
      "manufacturer": "P. Corp.",
      "lot_number": 1000,
      "manufacture_date": "2014-01-01",
      "expiry_date": "2016-01-01"
    },
    {
      "_vaccine_id": "550b46047fcba390ff335fff",
      "routine": true,
      "name": "Measles",
      "indication": "9 mo",
      "dose": .5,
      "dosing_unit": "ml",
      "route": "SC",
      "administered": false,
      "adverse_reaction": false,
      "administration_date": "",
      "scheduled_date": "2015-03-01",
      "body_site_administered": "right outer thigh",
      "dose_number": 1,
    },
    {
      "_id": "54f88ccddce0415f38397d33",
      "_vaccine_id": "999",
      "routine": false,
      "provider_id": "BBBB",
      "name": "Hepatitis B",
      "dose": 2,
      "dosing_unit": "ml",
      "route": "",
      "administered": true,
      "adverse_reaction": false,
      "administration_date": "2014-10-01",
      "scheduled_date": "2014-10-01",
      "body_site_administered": "",
      "lot_number": 1000,
      "manufacture_date": "2014-01-01",
      "expiry_date": "2016-01-01"
    },
    {
      "_id": "54f88ccddce0415f38397d34",
      "_vaccine_id": 60000,
      "routine": false,
      "name": "Hepatitis B",
      "dose": 2,
      "dosing_unit": "ml",
      "route": "intra dermal",
      "administered": false,
      "adverse_reaction": false,
      "administration_date": "",
      "scheduled_date": "2014-11-01",
      "body_site_administered": "left deltoid",
    },
    {
      "_id": "54f88ccda57c4a6954ecfe19",
      "_vaccine_id": "550b46047fcba390ff33ddda",
      "routine": true,
      "provider_id": "BBBB",
      "name": "Polio",
      "indication": "6 weeks",
      "dose": 2,
      "dosing_unit": "drops",
      "route": "PO",
      "administered": true,
      "adverse_reaction": false,
      "administration_date": "2014-10-01",
      "scheduled_date": "2014-10-01",
      "body_site_administered": "left thigh",
      "dose_number": 2,
      "manufacturer": "P. Corp.",
      "lot_number": 1000,
      "manufacture_date": "2014-01-01",
      "expiry_date": "2016-01-01"
    },
    {
      "_id": "54f88ccd2b5b5bbe9ad07c59",
      "_vaccine_id": 80000,
      "routine": false,
      "name": "Rotavirus",
      "dose": 0.05,
      "dosing_unit": "ml",
      "route": "intra dermal",
      "administered": false,
      "adverse_reaction": false,
      "administration_date": "",
      "scheduled_date": "2014-11-01",
    },
    {
      "_id": "54f88ccdefe294237482eb5f",
      "_vaccine_id": "550b4604d6f88cbkkk3587ba",
      "routine": false,
      "provider_id": "BBBB",
      "name": "DPT",
      "dose": 0.1,
      "dosing_unit": "ml",
      "route": "intra dermal",
      "administered": true,
      "adverse_reaction": true,
      "reaction_details": {
          "_id": "458d82kd",
          "_vaccination_id":"54f88ccdefe294237482eb5f",
          "date": "2014-10-01",
          "adverse_event_description": "Something bad, but not too bad.",
          "grade": "160754",
      },
      "administration_date": "2014-10-01",
      "scheduled_date": "2014-10-01",
      "body_site_administered": "outer thigh",
      "manufacturer": "P. Corp.",
      "lot_number": 1000,
      "manufacture_date": "2014-01-01",
      "expiry_date": "2016-01-01"
    }
  ],

  non_scheduled_vaccines: [

      {
        "_vaccine_id": "550b4604d6f88cbkkk3587ba",
        "name": "Rabies",
        "routine": false
      },
      {
        "_vaccine_id": "550b4604d6f88cbkkk3587ba",
        "name": "DPT",
        "routine": false
      },
      {
        "_vaccine_id": "550b460499dc11cccf4420bb",
        "name": "Hepatitis A",
        "routine": false
      },
      {
        "_vaccine_id": "550b4604a8298qqqb151205d",
        "name": "Hepatitis B",
        "routine": false
      },
      {
        "_vaccine_id": "4aslkjlkjaslkfjlkah234ql",
        "name": "Rotavirus",
        "routine": false
      },
      {
        "_vaccine_id": "550b4604a829wwweb1512ccc",
        "name": "Vitamin A",
        "dose": 100000,
        "dosing_unit": "IU",
        "route": "PO",
        "indication": "6 mo",
        "routine": true
      },
      {
        "_vaccine_id": "550b4604a829wwwxxx512ccc",
        "name": "Rabies"
      },
      {
        "_vaccine_id": "5zzz4604a829wwwxxx512ccc",
        "name": "Cholera"
      },
      {
        "_vaccine_id": "5zzz4gg4a829wwwxxx512ccc",
        "name": "Mumps"
      },
      {
        "_vaccine_id": "xzzz4gg4a829wwwxxx512ccc",
        "name": "Rubella"
      },
      {
        "_vaccine_id": "xzzz4gg4ls29wwwxxx512ccc",
        "name": "Tetanus toxoid"
      }

    ],

    scheduled_vaccines: [
      {
        "_vaccine_id": "550b46047fcba390ff335aaa",
        "name": "Bacillus Calmette-Guerin",
        "dose": .05,
        "dosing_unit": "ml",
        "dose_number": 1,
        "route": "Intra-dermal left forearm",
        "indication": "Birth to 1 yo",
        "routine": true
      },
      {
        "_vaccine_id": "550b46047fcba390ff335bba",
        "name": "Bacillus Calmette-Guerin",
        "dose": .1,
        "dosing_unit": "ml",
        "dose_number": 2,
        "route": "Intra-dermal left forearm",
        "indication": "Older than 1 yo",
        "routine": true
      },
      {
        "_vaccine_id": "550b46047fcba390ff335cca",
        "name": "Polio",
        "dose": 2,
        "dosing_unit": "drops",
        "dose_number": 1,
        "route": "PO",
        "indication": "Birth to 2 weeks",
        "routine": true
      },
      {
        "_vaccine_id": "550b46047fcba390ff33ddda",
        "name": "Polio",
        "dose": 2,
        "dosing_unit": "drops",
        "dose_number": 2,
        "route": "PO",
        "indication": "6 weeks",
        "routine": true
      },
      {
        "_vaccine_id": "550b46047fcba390ff33xxxa",
        "name": "Polio",
        "dose": 2,
        "dosing_unit": "drops",
        "dose_number": 3,
        "route": "PO",
        "indication": "10 weeks",
        "routine": true
      },
      {
        "_vaccine_id": "550b46047fcba390ff335ccc",
        "name": "Polio",
        "dose": 2,
        "dosing_unit": "drops",
        "dose_number": 4,
        "route": "PO",
        "indication": "14 weeks",
        "routine": true
      },
      {
        "_vaccine_id": "550b46047fcba390ff335fff",
        "name": "Measles",
        "dose": .5,
        "dosing_unit": "SC",
        "dose_number": 1,
        "route": "right upper arm",
        "indication": "9 mo",
        "routine": true
      },
    ]
})