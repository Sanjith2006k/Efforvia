const axios = require("axios");

const fallbackCourses = [
  {
    title: "HTML / Web Development Course",
    channel: "freeCodeCamp.org",
    thumbnail: "https://i.ytimg.com/vi/Ke90Tje7VS0/hqdefault.jpg",
    videoId: "Ke90Tje7VS0",
  },
  {
    title: "JavaScript Tutorial for Beginners",
    channel: "Programming with Mosh",
    thumbnail: "https://i.ytimg.com/vi/W6NZfCO5SIk/hqdefault.jpg",
    videoId: "W6NZfCO5SIk",
  },
  {
    title: "Python Full Course for Beginners",
    channel: "Simplilearn",
    thumbnail: "https://i.ytimg.com/vi/JMUxmLyrhSk/hqdefault.jpg",
    videoId: "JMUxmLyrhSk",
  },
  {
    title: "Data Science Course",
    channel: "Great Learning",
    thumbnail: "https://i.ytimg.com/vi/ua-CiDNNj30/hqdefault.jpg",
    videoId: "ua-CiDNNj30",
  },
];

const getFallbackCourses = (topic) =>
  fallbackCourses.map((course, index) => ({
    title: `${topic} - ${course.title}`,
    channel: course.channel,
    thumbnail: course.thumbnail,
    videoId: course.videoId,
    url: `https://www.youtube.com/watch?v=${course.videoId}`,
    source: "curated",
    rank: index + 1,
  }));

exports.searchVideos = async (topic) => {
  if (!process.env.YOUTUBE_API_KEY) {
    return getFallbackCourses(topic);
  }

  try {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          q: `${topic} tutorial`,
          maxResults: 8,
          type: "video",
          order: "relevance",
          videoEmbeddable: true,
          key: process.env.YOUTUBE_API_KEY,
        },
      },
    );

    return response.data.items.map((video) => ({
      title: video.snippet.title,
      channel: video.snippet.channelTitle,
      thumbnail: video.snippet.thumbnails.high.url,
      videoId: video.id.videoId,
      url: `https://youtube.com/watch?v=${video.id.videoId}`,
      source: "youtube",
    }));
  } catch (error) {
    console.log("YouTube Error:", error.response?.data || error.message);

    return getFallbackCourses(topic);
  }
};

exports.searchStepVideos = async (pathTopic, stepTopic) => {
  const videos = await exports.searchVideos(stepTopic);

  // Return top 3 videos to show multiple videos in learning-path
  return videos.slice(0, 3);
};
