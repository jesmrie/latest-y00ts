import Twitter from 'twitter-lite';

export const fetchTweets = async () => {
  const id = "1463770548018814976";
  const endpoint = `users/${id}/tweets`;
  const params =  {
    "max_results": 100,
    "expansions": [
        "entities.mentions.username"
    ],
    "user.fields": [
        "profile_image_url"
    ]
  };

  const client = new Twitter({
    version: "2",
    extension: false,
    bearer_token: process.env.TWITTER_BEARER_TOKEN
  });

  return client.get(endpoint, params);
}
