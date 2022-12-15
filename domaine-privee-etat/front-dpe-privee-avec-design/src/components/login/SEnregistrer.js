import FormulaireEnregistrement from "./Form.Enregistrement";

export default function SEnregistrer() {
  return (
    <>
      <div class="limiter">
        <div class="container-login100">
          <div class="wrap-login100">
            <div class="login100-pic js-tilt" data-tilt>
              <img
                src={process.env.PUBLIC_URL + `/logins/images/img-01.png`}
                alt="image"
              />
            </div>

            <FormulaireEnregistrement />
          </div>
        </div>
      </div>
    </>
  );
}
