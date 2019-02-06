FROM microsoft/dotnet:2.1-sdk
COPY . /WebApi
WORKDIR /WebApi
RUN ["dotnet", "restore"]
RUN ["dotnet", "build"]
EXPOSE 80/tcp
RUN chmod +x ./entrypoint.sh
CMD /bin/bash ./entrypoint.sh