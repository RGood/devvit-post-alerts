import { Devvit } from '@devvit/public-api-next';

const KEY = 'users';

Devvit.configure({
  redditAPI: true,
  kvStore: true,
});

Devvit.addMenuItem({
  label: "Subscribe to Posts",
  location: "subreddit",
  onPress: async (_, context) => {
    console.log('FUCK1');
    
    const user = await context.reddit.getUserById(context.userId!);

    const users = new Set(await context.kvStore.get<string[]>(KEY) || []);
    users.add(user.username);
    await context.kvStore.put(KEY, [...users]);
  }
});

Devvit.addMenuItem({
  label: "Unsubscribe from Posts",
  location: "subreddit",
  onPress: async (_, context) => {
    console.log('FUCK2');

    const user = await context.reddit.getUserById(context.userId!);

    const users = new Set(await context.kvStore.get<string[]>(KEY) || []);
    users.delete(user.username);
    await context.kvStore.put(KEY, [...users]);
  }
});

Devvit.addTrigger({
  event: 'PostSubmit',
  onEvent: async(event, context) => {
    console.log('FUCK3');
    // const subreddit = await context.reddit.getSubredditById(context.subredditId);
    // const users = await context.kvStore.get<string[]>(KEY) || [];
    // users.map((id) => {
    //   context.reddit.getUserById(id).then((user) => {
    //     context.reddit.sendPrivateMessageAsSubreddit({
    //       fromSubredditName: subreddit.name,
    //       to: user.username,
    //       subject: `A new post has been made in r/${subreddit.name}`,
    //       text: `Title: ${event.post?.title || "Err: Could not fetch title"}\n\n________\n\n/r/${subreddit.name}/comments/${event.post!.id}/_/`,
    //     })
    //   });
    // })
  },
});

export default Devvit;
