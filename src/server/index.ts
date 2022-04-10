export const fetchQueryResult = async (params: any, pagination?: number): Promise<any> => {
    let baseUrl = 'http://localhost:8983/solr/stocker/select?indent=true&q.op=OR'
    
    baseUrl = params.value ? `${baseUrl}&q=${params.label}%3A${params.value}` : `${baseUrl}&q=*%3A*`
    if(typeof pagination !== 'undefined') {
        console.log('pagination!')
        baseUrl += `&start=${pagination}`
    }

    const data = await fetch(baseUrl)

    return data.json();
}

export const fetchHandleSuggestion = async (handle: string) => {
    const data = await fetch(`http://localhost:8983/solr/stocker/suggest?indent=true&q.op=OR&q=${handle}`)
    
    return data.json()
}

export const fetchAllStockComments = async (query: string): Promise<any> => {
    const data = await fetch(`http://localhost:8983/solr/stocker/select?indent=true&q.op=OR&q=${query}&rows=1000`)
    return data.json()
}