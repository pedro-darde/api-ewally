class BoletoService {
  setCodigo(codigo: string) {
    return this.validaLinhaDigitavel(codigo);
  }

  setCodigoArrecadacao(codigo: string) {}

  validaLinhaDigitavel(codigo: string) {
    let regex = new RegExp(/^[0-9]{47}$/);
    if (!regex.test(codigo)) {
      throw new Error(
        "Verifique se você digitou todos os números e não passou nenhum caracter no valor"
      );
    }

    const blocos = [
      {
        num: codigo.substring(0, 9),
        DV: codigo.substring(9, 10),
      },
      {
        num: codigo.substring(10, 20),
        DV: codigo.substring(20, 21),
      },
      {
        num: codigo.substring(21, 31),
        DV: codigo.substring(31, 32),
      },
    ];
    let vencimento = Number(codigo.substring(33, 37));
    let valorSemVirgula = codigo.substring(37, 45);
    let virgulaValor = codigo.substring(45, 47);

    let valorTotal = Number(valorSemVirgula.concat("." + virgulaValor));

    let validNumbers = blocos.map((vals) => {
      return this.sum(vals.num);
    });

    let dvs = blocos.map((vals) => {
      return Number(vals.DV);
    });

    if (!validNumbers.every((u, i) => {return u === dvs[i]})) {
      throw new Error("Os digitos validadores estão incorretos");
    }

    let date = new Date("10/07/1997");
    date.setTime(date.getTime() + vencimento * 24 * 60 * 60 * 1000);

    return {
      valorTotal: valorTotal.toFixed(2),
      dataVencimento: date,
    };
  }

  sum(str: string) {
    const codigo = str.split("").reverse();
    const somatorio = codigo.reduce((acc, current, index) => {
      let soma = Number(current) * (((index + 1) % 2) + 1);
      soma = soma > 9 ? Math.trunc(soma / 10) + (soma % 10) : soma;
      return acc + soma;
    }, 0);
    return Math.ceil(somatorio / 10) * 10 - somatorio;
  }

  validaLinhaDigitavelForArrecadacao(codigo: string) {
    let regex = new RegExp(/^[0-9]{48}$/);

    const codigoMoeda = Number(codigo[2]);

    if(!regex.test(codigo) || Number(codigo[0]) == 8) {
      throw new Error('Linha digitavel informada esta errada')
    }

    //TODO Validação boletos de convênio
  }
}
export default BoletoService;
