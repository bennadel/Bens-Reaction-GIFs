
# Ben's Reaction GIFs

by [Ben Nadel][bennadel]

This is just a fun little side-project to organize the GIF images that I tend to use as **reactions in Slack**. The idea here being that I can quickly search for the desired GIF based on keywords and then **click-to-copy** the URL right into my clipboard. Then, I can paste the image URL directly into Slack rather than having to upload the image and have Slack process it (which often takes longer than I would like - in comedy, timing is everything).

There's nothing _too smart_ happening here. The images are hard-coded; and both the GIFs and their thumbnails are committed directly to the git repository. The thumbnails need to be generated ahead of time using an `npm run-script`:

```sh
npm run images
```

The images then need to be added to the `manifest.ts` file.


[bennadel]: https://www.bennadel.com/
