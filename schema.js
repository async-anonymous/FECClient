/*eslint-disable*/

[
  {
    "product_id": Number,
    "category": String,
    "created_at": Timestamp,
    "default_price": Number,
    "description": String,
    "name": String,
    "slogan": String,
    "updated_at": Timestamp,
    "related_products": [Number],
    "product_styles": [
      {
        "default?": Boolean,
        "name": String,
        "original_price": Number,
        "photos": [
          {
            "url": String,
            "thumbnail_url": String
          }
        ],
        "sale_price": Number,
        "skus": [
          {
            "quantity": Number,
            "size": String,
          }
        ]
      }
    ],
    "features": [
      {
        "feature": String,
        "value": String
      }
    ]
  }
]