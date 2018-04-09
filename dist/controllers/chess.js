"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createChess = (req, res) => {
    const id = Math.round((Math.random() * 10000000000000000));
    res.redirect(`/chess/${id}`);
};
exports.chess = (req, res) => {
    res.render("chess", {
        title: "Chess"
    });
};
//# sourceMappingURL=chess.js.map