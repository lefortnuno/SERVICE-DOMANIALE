export default function getDataUtilisateur() {
  const u_info = {
    u_token: localStorage.token,
    u_identification: localStorage.identification,
    u_attribut: localStorage.attribut,
    u_nom: localStorage.nom,
    u_prenom: localStorage.prenom,
    u_numeroCompte: localStorage.numeroCompte,
    u_statu: localStorage.statu,
    u_unite: localStorage.unite,
    u_photoPDP: localStorage.photoPDP,
    u_u_cin: localStorage.u_cin,
  };

  const headOpts = {
    opts: {
      headers: {
        Authorization: u_info.u_token,
      },
    },
  };

  let u_data = Object.assign({}, u_info);
  u_data = Object.assign(u_data, headOpts);

  return u_data;
}
