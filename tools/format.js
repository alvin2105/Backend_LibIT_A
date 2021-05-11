module.exports = fn = (data) => {
  return {
    id: data.id ? data.id.value : "",
    title: data.title ? data.title.value : "",
    language: data.language ? data.language.value : "",
    framework: data.framework ? data.framework.value : "",
    date: data.date ? data.date.value : "",
    description: data.description ? data.description.value : "",
    author: data.author ? data.author.value : "",
    url: data.url ? data.url.value : "",
  };
};
