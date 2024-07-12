
export interface HomeVideoType {
    videoId: string;
    videoTitle: string;
    videoDescription: string;
    videoLink: string;
    videoThumbnail: string;
    videoDuration: string;
    videoViews: string;
    videoAge: string;
    channelInfo: {
        id: string;
        image: string;
        name: string;
    };
}

// {
//     "kind": "youtube#videoListResponse",
//     "etag": "ZpppX6JXrYMQAYYz-dSo9SjBhUM",
//     "items": [
//       {
//         "kind": "youtube#video",
//         "etag": "74CpUDAOzzUnsGrvGverj_5UT-g",
//         "id": "GHtIxjKPP9w",
//         "contentDetails": {
//           "duration": "PT10M45S",
//           "dimension": "2d",
//           "definition": "hd",
//           "caption": "false",
//           "licensedContent": true,
//           "regionRestriction": {
//             "blocked": [
//               "CN",
//               "TW"
//             ]
//           },
//           "contentRating": {},
//           "projection": "rectangular"
//         }
//       },
//       {
//         "kind": "youtube#video",
//         "etag": "g3vOQj7tm6QLh91p56MzwCMFDxg",
//         "id": "CdBpocUIux4",
//         "contentDetails": {
//           "duration": "PT10M23S",
//           "dimension": "2d",
//           "definition": "hd",
//           "caption": "false",
//           "licensedContent": true,
//           "contentRating": {},
//           "projection": "rectangular"
//         }
//       },
//       {
//         "kind": "youtube#video",
//         "etag": "Mm7Lao6TJPkN12c83Ka_ruo6lIQ",
//         "id": "dXMlaD-kqDs",
//         "contentDetails": {
//           "duration": "PT1H17M11S",
//           "dimension": "2d",
//           "definition": "hd",
//           "caption": "false",
//           "licensedContent": true,
//           "contentRating": {},
//           "projection": "rectangular"
//         }
//       },
//       {
//         "kind": "youtube#video",
//         "etag": "SEFF7XD7aqepFmqstnz1XohSVrM",
//         "id": "7YA_b1_DGVU",
//         "contentDetails": {
//           "duration": "PT2M59S",
//           "dimension": "2d",
//           "definition": "hd",
//           "caption": "false",
//           "licensedContent": false,
//           "regionRestriction": {
//             "blocked": [
//               "RU"
//             ]
//           },
//           "contentRating": {},
//           "projection": "rectangular"
//         }
//       },
//       {
//         "kind": "youtube#video",
//         "etag": "z1x6iAIpAgSRaFTsT3cXGgrsa3A",
//         "id": "FyfBMYzD440",
//         "contentDetails": {
//           "duration": "PT34M36S",
//           "dimension": "2d",
//           "definition": "hd",
//           "caption": "false",
//           "licensedContent": true,
//           "contentRating": {},
//           "projection": "rectangular"
//         }
//       }
//     ],
//     "nextPageToken": "CAUQAA",
//     "pageInfo": {
//       "totalResults": 200,
//       "resultsPerPage": 5
//     }
//   }
