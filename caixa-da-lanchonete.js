class CaixaDaLanchonete {
    calcularValorDaCompra(formaDePagamento, itens) {
        const menu = {
            cafe: 3.00,
            suco: 6.20,
            sanduiche: 6.50,
            queijo: 2.00,
            salgado: 7.25,
            combo1: 9.50,
            combo2: 7.50,
        };

        const extras = {
            chantily: 1.5,
            queijo: 2.0,
        };

        const formasDePagamentoValidas = ['dinheiro', 'credito', 'debito'];
        
        if (!formasDePagamentoValidas.includes(formaDePagamento)) {
            return 'Forma de pagamento inválida!';
        }

        if (itens.length === 0) {
            return 'Não há itens no para a compra!';
        }

        let valorTotal = 0;
        for (const item of itens) {
            const [produto, quantidade] = item.split(',');
            if (!menu[produto] || isNaN(quantidade) || quantidade < 1) {
                return 'Item inválido!';
            }
            valorTotal += menu[produto] * parseInt(quantidade);
        }

        const itemPrincipal = itens.some(item => item.startsWith('cafe') || item.startsWith('sanduiche'));
        const possuiItemExtra = itens.some(item => item.startsWith('chantily') || item.startsWith('queijo'));

        if (possuiItemExtra && !itemPrincipal) {
            return 'Item extra não pode ser pedido sem o principal';
        }

        if (itemPrincipal) {
            for (const item of itens) {
                if (extras[item]) {
                    valorTotal += extras[item];
                }
            }
        }

        if (formaDePagamento === 'dinheiro') {
            valorTotal *= 0.95;
        } else if (formaDePagamento === 'credito') {
            valorTotal *= 1.03;
        }

        return `R$ ${valorTotal.toFixed(2)}`;
    }
}

export { CaixaDaLanchonete };