import { Jogador } from "../interfaces/jogador";

class Login {

    public static validateLogin(jogador: Jogador): Jogador | string {
        if (jogador == undefined || jogador == null) {
            return "Jogador não encontrado, Tem certeza que digitou seu nome corretamente?"
        }

        return jogador;
    }

}

export default Login;