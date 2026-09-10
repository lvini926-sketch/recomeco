param(
    [Parameter(Position = 0)]
    [string]$Acao = "help",

    [Parameter(Position = 1)]
    [string]$Mensagem = ""
)

$ErrorActionPreference = "Stop"

function Titulo {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "        RECOMeco - PAINEL DEV" -ForegroundColor Cyan
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
}

function Status {
    Titulo
    Write-Host "Git:" -ForegroundColor Yellow
    git status
}

function Dev {
    Titulo
    Write-Host "Iniciando o RECOMeco..." -ForegroundColor Green
    npm run dev -- --hostname 0.0.0.0
}

function Build {
    Titulo
    Write-Host "Executando build de producao..." -ForegroundColor Yellow
    npm run build

    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "BUILD OK - projeto funcionando." -ForegroundColor Green
    } else {
        Write-Host ""
        Write-Host "BUILD COM ERRO - nao faca commit ainda." -ForegroundColor Red
    }
}

function Save {
    Titulo

    if ([string]::IsNullOrWhiteSpace($Mensagem)) {
        Write-Host "Informe uma mensagem para o commit." -ForegroundColor Red
        Write-Host '.\recomeco.ps1 save "melhora tela inicial"'
        return
    }

    Write-Host "Verificando alteracoes..." -ForegroundColor Yellow
    git status

    Write-Host ""
    Write-Host "Adicionando arquivos..." -ForegroundColor Yellow
    git add .

    Write-Host ""
    Write-Host "Criando commit..." -ForegroundColor Yellow
    git commit -m $Mensagem

    if ($LASTEXITCODE -ne 0) {
        Write-Host ""
        Write-Host "Commit nao realizado." -ForegroundColor Red
        return
    }

    Write-Host ""
    Write-Host "Enviando para o GitHub..." -ForegroundColor Yellow
    git push

    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "SALVO NO GITHUB COM SUCESSO." -ForegroundColor Green
    }
}

function Pull {
    Titulo
    Write-Host "Atualizando projeto..." -ForegroundColor Yellow
    git pull
}

function Help {
    Titulo

    Write-Host "COMANDOS DISPONIVEIS" -ForegroundColor Yellow
    Write-Host ""
    Write-Host ".\recomeco.ps1 status"
    Write-Host "Mostra o estado do Git."
    Write-Host ""
    Write-Host ".\recomeco.ps1 dev"
    Write-Host "Inicia o servidor de desenvolvimento."
    Write-Host ""
    Write-Host ".\recomeco.ps1 build"
    Write-Host "Testa se o projeto compila corretamente."
    Write-Host ""
    Write-Host '.\recomeco.ps1 save "mensagem"'
    Write-Host "Salva alteracoes e envia para o GitHub."
    Write-Host ""
    Write-Host ".\recomeco.ps1 pull"
    Write-Host "Atualiza o projeto a partir do GitHub."
    Write-Host ""
}

switch ($Acao.ToLower()) {
    "status" { Status }
    "dev"    { Dev }
    "build"  { Build }
    "save"   { Save }
    "pull"   { Pull }
    "help"   { Help }
    default  { Help }
}