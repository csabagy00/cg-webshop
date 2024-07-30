FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["cgWebShopApi/cgWebShopApi.csproj", "cgWebShopApi/"]
RUN dotnet restore "cgWebShopApi/cgWebShopApi.csproj"
COPY . .
WORKDIR "/src/cgWebShopApi"
RUN dotnet build "cgWebShopApi.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "cgWebShopApi.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "cgWebShopApi.dll"]
