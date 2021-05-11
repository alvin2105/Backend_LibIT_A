const connection = require("../connection/DatabaseConnection");
const Format = require("../tools/format");

module.exports.getRepository = async (req, res) => {
  try {
    console.log("function starting");
    // Query data dari repo
    let repos = await connection.getRepository(req.query);

    if (!repos.bindings.length) {
      return res.status(200).json({
        data: [],
        message: "Data tidak ditemukan",
      });
    }

    repos = repos.bindings.map((repo) => Format(repo));

    if (req.params.id) {
      let repo = repos.filter((repo) => {
        return repo.id == req.params.id;
      });
      res.status(200).json({
        data: repo[0],
        message: repo.length
          ? "Data repository berhasil didapatkan"
          : "Tidak ada hasil dari pencarian",
      });
    } else {
      res.status(200).json({
        data: repos,
        message: "Menampilkan Semua Code Project",
      });
    }
  } catch (err) {
    res.status(400).json(err);
  }
};
