const axios = require("axios");
const qs = require("qs");

const DATA_URL = "http://localhost:3030";

const headers = {
  Accept: "application/sparql-results+json,*/*;q=0.9",
  "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
};

exports.getRepository = async (param) => {
  // Query
  const queryData = {
    query: `PREFIX data:<https://github.com/>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> 
    SELECT ?id ?title ?language ?framework ?date ?description ?author ?url
    WHERE{
        ?sub rdf:type data:code
        OPTIONAL {?sub data:id ?id.}
        OPTIONAL {?sub data:title ?title.}
        OPTIONAL {?sub data:language ?language.}
        OPTIONAL {?sub data:framework ?framework.}
        OPTIONAL {?sub data:date ?date.}
        OPTIONAL {?sub data:description ?description.}
        OPTIONAL {?sub data:author ?author.}
        OPTIONAL {?sub data:url ?url.}
        
        FILTER regex(?id, "${param.id ? param.id : ""}", "i")
        FILTER regex(?title, "${param.title ? param.title : ""}", "i")
        FILTER regex(?language, "${param.language ? param.language : ""}", "i")
        FILTER regex(?framework, "${
          param.framework ? param.framework : ""
        }", "i")
        FILTER regex(?date, "${param.date ? param.date : ""}", "i")
        FILTER regex(?description, "${
          param.description ? param.description : ""
        }", "i")
        FILTER regex(?author, "${param.author ? param.author : ""}", "i")
        FILTER regex(?url, "${param.url ? param.url : ""}", "i")
    }`,
  };
  try {
    const { data } = await axios(`${DATA_URL}/code/query`, {
      method: "POST",
      headers,
      data: qs.stringify(queryData),
    });
    return data.results;
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = exports;
