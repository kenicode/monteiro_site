function mostrarCamposAdicionais() {
    const regime = document.getElementById('regime').value;
    document.getElementById('ufGroup').classList.add('hidden');
    document.getElementById('cfopGroup').classList.add('hidden');
    if (regime === '6') {
        document.getElementById('ufGroup').classList.remove('hidden');
    } else if (regime === '7') {
        document.getElementById('cfopGroup').classList.remove('hidden');
    }
}
document.getElementById('regime').addEventListener('change', mostrarCamposAdicionais);

function calcular() {
    const empresa = document.getElementById('empresa').value;
    const cnpj = document.getElementById('cnpj').value;
    const receitaBruta = parseFloat(document.getElementById('receitaBruta').value);
    const icms = parseFloat(document.getElementById('icms').value);
    const icmsSt = parseFloat(document.getElementById('icmsSt').value);
    const regime = document.getElementById('regime').value;
    let resultado = '';

    if (!receitaBruta || !icms || !icmsSt || !regime) {
        alert('Por favor, preencha todos os campos obrigatórios!');
        return;
    }

    if (empresa || cnpj) {
        resultado += 'DADOS DA EMPRESA:\n';
        if (empresa) resultado += `Nome: ${empresa}\n`;
        if (cnpj) resultado += `CNPJ: ${cnpj}\n`;
        resultado += '-----------------------------------\n';
    }

    const subtracao = receitaBruta - icms - icmsSt;
    resultado += `BASE DE CÁLCULO: R$ ${subtracao.toFixed(2)}\n-----------------------------------\n`;

    if (regime === '1' || regime === '2') {
        resultado += calcularPisCofins(subtracao, regime);
    } else if (regime === '3' || regime === '4' || regime === '5') {
        resultado += calcularIrpjCsll(subtracao, regime);
    } else if (regime === '6') {
        resultado += calcularIcms(subtracao, parseInt(document.getElementById('uf').value));
    } else if (regime === '7') {
        const cfop = parseInt(document.getElementById('cfop').value);
        const mva = parseFloat(document.getElementById('mva').value);
        if (!mva) {
            alert('Por favor, informe o MVA!');
            return;
        }
        resultado += calcularIcmsSt(subtracao, cfop, mva);
    }

    const data = new Date().toLocaleDateString('pt-BR');
    resultado += `\n-----------------------------------\nCálculo realizado em: ${data}`;

    document.getElementById('resultado').textContent = resultado;
    document.getElementById('exportPdf').classList.remove('hidden');
    document.getElementById('exportImg').classList.remove('hidden');
}

function calcularPisCofins(subtracao, regime) {
    let pis, cofins;
    if (regime === '1') {
        pis = subtracao * 0.0065;
        cofins = subtracao * 0.03;
        return `\nREGIME: LUCRO PRESUMIDO\nPIS A PAGAR (0,65%): R$ ${pis.toFixed(2)}\nCOFINS A PAGAR (3%): R$ ${cofins.toFixed(2)}`;
    } else {
        pis = subtracao * 0.0165;
        cofins = subtracao * 0.076;
        return `\nREGIME: LUCRO REAL\nPIS A PAGAR (1,65%): R$ ${pis.toFixed(2)}\nCOFINS A PAGAR (7,6%): R$ ${cofins.toFixed(2)}`;
    }
}

function calcularIrpjCsll(subtracao, regime) {
    let irpj, csll;
    if (regime === '3') {
        irpj = subtracao * 0.15;
        csll = subtracao * 0.09;
        return `\nREGIME: LUCRO PRESUMIDO\nIRPJ A PAGAR (15%): R$ ${irpj.toFixed(2)}\nCSLL A PAGAR (9%): R$ ${csll.toFixed(2)}`;
    } else if (regime === '4') {
        irpj = subtracao * 0.15;
        csll = subtracao * 0.09;
        return `\nREGIME: LUCRO REAL\nIRPJ A PAGAR (15%): R$ ${irpj.toFixed(2)}\nCSLL A PAGAR (9%): R$ ${csll.toFixed(2)}`;
    } else if (regime === '5') {
        irpj = subtracao * 0.25;
        csll = subtracao * 0.12;
        return `\nREGIME: LUCRO REAL\nIRPJ A PAGAR (25%): R$ ${irpj.toFixed(2)}\nCSLL A PAGAR (12%): R$ ${csll.toFixed(2)}`;
    }
}

function calcularIcms(subtracao, uf) {
    const ufs = {
        1: {nome: "ACRE", aliquota: 0.19},
        2: {nome: "ALAGOAS", aliquota: 0.18},
        3: {nome: "AMAPA", aliquota: 0.18},
        4: {nome: "AMAZONAS", aliquota: 0.18},
        5: {nome: "BAHIA", aliquota: 0.18},
        6: {nome: "CEARA", aliquota: 0.18},
        7: {nome: "DISTRITO FEDERAL", aliquota: 0.18},
        8: {nome: "ESPIRITO SANTO", aliquota: 0.17},
        9: {nome: "GOIAS", aliquota: 0.17},
        10: {nome: "MARANHAO", aliquota: 0.18},
        11: {nome: "MATO GROSSO", aliquota: 0.17},
        12: {nome: "MATO GROSSO DO SUL", aliquota: 0.17},
        13: {nome: "MINAS GERAIS", aliquota: 0.18},
        14: {nome: "PARA", aliquota: 0.17},
        15: {nome: "PARAIBA", aliquota: 0.18},
        16: {nome: "PARANA", aliquota: 0.19},
        17: {nome: "PERNAMBUCO", aliquota: 0.18},
        18: {nome: "PIAUI", aliquota: 0.18},
        19: {nome: "RIO DE JANEIRO", aliquota: 0.20},
        20: {nome: "RIO GRANDE DO NORTE", aliquota: 0.18},
        21: {nome: "RIO GRANDE DO SUL", aliquota: 0.18},
        22: {nome: "RONDONIA", aliquota: 0.175},
        23: {nome: "RORAIMA", aliquota: 0.17},
        24: {nome: "SANTA CATARINA", aliquota: 0.17},
        25: {nome: "SAO PAULO", aliquota: 0.18},
        26: {nome: "SERGIPE", aliquota: 0.18},
        27: {nome: "TOCANTINS", aliquota: 0.18}
    };
    const aliquota = ufs[uf].aliquota;
    const icms = subtracao * aliquota;
    return `\nUF: ${ufs[uf].nome}\nALÍQUOTA ICMS: ${(aliquota * 100).toFixed(1)}%\nICMS A PAGAR: R$ ${icms.toFixed(2)}`;
}

function calcularIcmsSt(subtracao, cfop, mva) {
    const cfops = {
        5102: {nome: "Venda de mercadoria dentro do estado", aliquota_icms_st: 0.18},
        5405: {nome: "Revenda de mercadoria", aliquota_icms_st: 0.20},
        5949: {nome: "Outras operações", aliquota_icms_st: 0.17}
    };
    const aliquota_icms = 0.18;
    const aliquota_icms_st = cfops[cfop].aliquota_icms_st;
    const mvaDecimal = mva / 100;
    const icms_proprio = subtracao * aliquota_icms;
    const base_icms_st = subtracao * (1 + mvaDecimal);
    const icms_st = (base_icms_st * aliquota_icms_st) - icms_proprio;
    return `\nCFOP: ${cfop} - ${cfops[cfop].nome}\nALÍQUOTA ICMS ST: ${(aliquota_icms_st * 100).toFixed(2)}%\nBASE ICMS ST: R$ ${base_icms_st.toFixed(2)}\nICMS PROPRIO: R$ ${icms_proprio.toFixed(2)}\nICMS ST A PAGAR: R$ ${icms_st.toFixed(2)}`;
}

// Exportação PDF e Imagem
function exportarPDF() {
    const doc = new window.jspdf.jsPDF();
    const resultado = document.getElementById('resultado').textContent;
    const linhas = resultado.split('\n');
    let y = 10;
    doc.setFontSize(12);
    doc.text("Calculadora Tributária - Resultado", 10, y);
    y += 10;
    doc.line(10, y, 200, y);
    y += 10;
    linhas.forEach(linha => {
        if (y > 280) {
            doc.addPage();
            y = 10;
        }
        doc.text(linha, 10, y);
        y += 7;
    });
    doc.save('calculo_tributario.pdf');
}

function exportarImagem() {
    window.html2canvas(document.querySelector('.calculadora-container')).then(canvas => {
        const link = document.createElement('a');
        link.download = 'calculo_tributario.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
}