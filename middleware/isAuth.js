exports.isAuth = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect("/login");
  }
  console.log("[isAuth] middleware passed.");
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.user.role < 1) {
    return res.render("error/invalid", {
      pageTitle: "create-user",
      path: "/create-user",
      isLoggedIn: false,
    });
  }
  console.log("[isAdmin] middleware passed.");
  next();
};

exports.isSuperAdmin = (req, res, next) => {
  if (!req.user.role !== 2) {
    return res.render("error/invalid", {
      pageTitle: "create-user",
      path: "/create-user",
      isLoggedIn: false,
    });
  }
  console.log("[isSuperAdmin] middleware passes");
  next();
};
