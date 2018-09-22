exports.stickerDefinition = [
  {
    sticker_id: { column: "sticker_id", id: true },
    creator: { column: "first_name" },
    user_id: { column: "id" },
    title: { column: "title" },
    description: { column: "description" },
    prices: { column: "prices" },
    image_url: { column: "image_url" },
    like:[
      {
        user_id: { column: "user_id" },
        name: { column: "name" },
        create_at: { column: "create_at" },
        modify_at: { column: "modify_at" }
      }
    ],
    create_at: { column: "create_at" },
    modify_at: { column: "modify_at" }
  }
]