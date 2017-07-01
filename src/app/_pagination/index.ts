/**

    public getDMatter(id) {
        return new Promise(function(resolve, reject) {
            
            var request = this.gapi.client.request({
                'path': 'https://test-dot-dev-lolly.appspot.com/_ah/api/dmatterendpoint/v1/matterdetaildto/'+id,
                'method': 'GET',
                'headers' : {'Authorization': 'Bearer '+ this.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token},
            });

            request.execute(function(resp) {
                resolve(resp);
            }, function(error) {
                reject(error);
            });
        });
    }

    public getreadFiltered(fmatter: FMatter) {
        
        return new Promise(function(resolve, reject) {
            var request = this.gapi.client.request({
                'path': 'https://test-dot-dev-lolly.appspot.com/_ah/api/dmatterendpoint/v1/collectionresponse_dmatterdto/',
                 // change to the post
                'method': 'POST',
                'body' : fmatter,
                'headers' : {'Authorization': 'Bearer '+ this.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token},
            });

            request.execute(function(resp) {
                resolve(resp);
            }, function(error) {
                reject(error);
            });
        });
    }
 */