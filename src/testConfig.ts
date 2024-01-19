import {allLogFields, allBlockHeaderFields} from './allFields'

export const ERC20_TRANSFER_TOPIC = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'

function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

const commonConfig = {
    batchHandler: async (ctx: any) => {
        let usdtTransfers = 0
        for (let block of ctx.blocks) {
            usdtTransfers += block.logs.length
        }
        ctx.log.info(`Got ${usdtTransfers} ERC20 transfers`)
    },
    includeAllBlocks: false,
    transactions: [],
    fields: {
        log: allLogFields,
        block: allBlockHeaderFields
    }
}

export const networksConfig = {
    eth: {
        datasetUrl: 'http://localhost:8000/network/ethereum-mainnet',
        range: {
            from: getRandomInt(4_634_748, 17_000_000)
        },
        logs: [{
            address: ['0x7EA2be2df7BA6E54B1A9C70676f668455E329d29'.toLowerCase()], // USDT
            topic0: [ERC20_TRANSFER_TOPIC],
            range: {
                from: 4_634_748
            }
        }],
        ...commonConfig
    },
    bsc: {
        datasetUrl: 'http://localhost:8000/network/binance-mainnet',
        range: {
            from: getRandomInt(176_416, 32_000_000)
        },
        logs: [{
            address: ['0x55d398326f99059fF775485246999027B3197955'.toLowerCase()], // BUSD
            topic0: [ERC20_TRANSFER_TOPIC],
            range: {
                from: 176_416
            }
        }],
        ...commonConfig
    },
    base: {
        datasetUrl: 'http://localhost:8000/network/base-mainnet',
        range: {
            from: getRandomInt(2_797_221, 8_000_000)
        },
        logs: [{
            address: ['0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913'.toLowerCase()], // USDC
            topic0: [ERC20_TRANSFER_TOPIC],
            range: {
                from: 2_797_221
            }
        }],
        ...commonConfig
    },
    moonbeam: {
        datasetUrl: 'http://localhost:8000/network/moonbeam-mainnet',
        range: {
            from: getRandomInt(171_972, 3_000_000)
        },
        logs: [{
            address: ['0x8f552a71EFE5eeFc207Bf75485b356A0b3f01eC9'.toLowerCase()], // USDC
            topic0: [ERC20_TRANSFER_TOPIC],
            range: {
                from: 171_972
            }
        }],
        ...commonConfig
    }
}
