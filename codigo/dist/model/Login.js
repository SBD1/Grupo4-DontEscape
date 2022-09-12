class Login {
    static validateLogin(jogador) {
        if (jogador == undefined || jogador == null) {
            return "Jogador não encontrado, Tem certeza que digitou seu nome corretamente?";
        }
        return jogador;
    }
}
export default Login;
