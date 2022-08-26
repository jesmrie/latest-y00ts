import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { fetchTweets } from "../services/twitter";
import { useEffect, useState } from "react";

export default function Home(props) {
  const y00tlisted = Object.entries(props.y00tlisted);
  const [y00tlistedCircles, sety00tlistedCircles] = useState("Loading...");

  useEffect(() => {
    if (y00tlisted.length > 1) {
      sety00tlistedCircles(
        y00tlisted.map((userArray) => {
          const user = userArray[1];
          const link = `https://twitter.com/${user.username}`;
          return (
            <div key={user.username}>
              <a href={link}>
                <div
                  className={styles.circle}
                  style={{
                    backgroundImage: `url(${user.profile_image_url})`,
                  }}
                ></div>
              </a>
            </div>
          );
        }),
      );
    }
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Latest y00tlisted</title>
        <meta
          name="description"
          content="A hundred cool people recently added to the y00ts community"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.image}>
          <Image
            src="/y00ts.png"
            layout="fill"
            objectFit="contain"
            alt="y00ts logo"
          />
        </div>
        <h1>Latest y00ts Scholars</h1>
        <p>
          A hundred cool people recently <br /> added to the community.
        </p>
        <div className={styles.circlesContainer}>
          <div className={styles.circlesRow}>
            {y00tlistedCircles}
          </div>
        </div>
        <div>
          <a>
            <button className={styles.button}>Apply as Scholar</button>
          </a>
        </div>
        <div className={styles.footer}>
          <p>
            Made with ♥ by <a href="https://twitter.com/0xJes">@0xJes</a>
          </p>
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const response = await fetchTweets();
  const users = response.includes.users;
  // const errors = response.errors;
  const twitterUsername = `y00tsNFT`;

  const y00tlisted = users
    .map((user) => {
      const { username, profile_image_url } = user;

      if (username !== twitterUsername) {
        return {
          username,
          profile_image_url,
        };
      }
    })
    .filter((n) => n);

  return {
    props: {
      y00tlisted: JSON.parse(JSON.stringify(y00tlisted)),
    },
  };
}
