var documenterSearchIndex = {"docs":
[{"location":"Milankovitch/#Milankovitch-Cycles","page":"Milankovitch Cycles","title":"Milankovitch Cycles","text":"","category":"section"},{"location":"Milankovitch/#Variations-in-orbital-parameters","page":"Milankovitch Cycles","title":"Variations in orbital parameters","text":"","category":"section"},{"location":"Milankovitch/","page":"Milankovitch Cycles","title":"Milankovitch Cycles","text":"using Insolation\nusing Plots\n\nod = Insolation.OrbitalData()\ndt = collect(-500e3:100:500e3); # years\ny = hcat(collect.(orbital_params.(Ref(od), dt))...);\nϖ, γ, e = y[1,:], y[2,:], y[3,:];\n\np1 = plot(dt ./ (1e3), sin.(ϖ), legend=false);\nylabel!(\"sin(ϖ)\");\np2 = plot(dt ./ (1e3), γ, legend=false);\nylabel!(\"γ\");\np3 = plot(dt ./ (1e3), e, legend=false);\nylabel!(\"e\");\nxlabel!(\"Time (kyr)\")\nplot(p1, p2, p3, layout = grid(3,1), size=(600,400), dpi=250);\nsavefig(\"orbital_params.png\")","category":"page"},{"location":"Milankovitch/","page":"Milankovitch Cycles","title":"Milankovitch Cycles","text":"(Image: )","category":"page"},{"location":"Milankovitch/#Variations-in-date-of-vernal-equinox-and-perihelion-on-centennial-timescales","page":"Milankovitch Cycles","title":"Variations in date of vernal equinox and perihelion on centennial timescales","text":"","category":"section"},{"location":"Milankovitch/","page":"Milankovitch Cycles","title":"Milankovitch Cycles","text":"using Roots\nusing Optim\ninclude(\"find_equinox_perihelion_dates.jl\")\n\nyears = 1800:2200;\ndays_eq = zeros(length(years));\ndays_per = zeros(length(years));\nod = Insolation.OrbitalData()\nfor (i,year) in enumerate(years)\n    f = (x -> zdiff(x, year, od))\n    days_eq[i] = find_zeros(f,-30,60)[1]\n\n    f = (x -> edist(x, year, od))\n    res = optimize(f,-50,50)\n    days_per[i] = Optim.minimizer(res)[1]\nend\n\nplot((years), days_eq, legend=false, dpi=250)\nxlabel!(\"Year\")\nylabel!(\"Day in March\")\ntitle!(\"Date of vernal equinox\")\nsavefig(\"equinox_dates.png\")\n\nplot((years), days_per, legend=false, dpi=250)\nxlabel!(\"Year\")\nylabel!(\"Day in Jan\")\ntitle!(\"Date of perihelion\")\nsavefig(\"perihelion_dates.png\")","category":"page"},{"location":"Milankovitch/","page":"Milankovitch Cycles","title":"Milankovitch Cycles","text":"The Gregorian calendar was introduced (with leap years and leap centuries) precisely to keep the vernal equinox approximately fixed at March 21 on centennial timescales. (Image: ) (Image: )","category":"page"},{"location":"Milankovitch/#Variations-in-date-of-vernal-equinox-on-millenial-timescales","page":"Milankovitch Cycles","title":"Variations in date of vernal equinox on millenial timescales","text":"","category":"section"},{"location":"Milankovitch/","page":"Milankovitch Cycles","title":"Milankovitch Cycles","text":"using Roots\ninclude(\"find_equinox_perihelion_dates.jl\")\nod = Insolation.OrbitalData()\nyears = -50e3:100:30e3 \ndays_eq = zeros(length(years)) \nfor (i,year) in enumerate(years) \n    f = (x -> zdiff(x, year, od)) \n    days_eq[i] = find_zeros(f,-100,100)[1] \nend \n\nplot((years / 1000), days_eq, legend=false, dpi=250) \nxlabel!(\"kyr\") \nylabel!(\"Day in March\") \ntitle!(\"Date of vernal equinox\") \nsavefig(\"equinox_dates_long.png\") ","category":"page"},{"location":"Milankovitch/","page":"Milankovitch Cycles","title":"Milankovitch Cycles","text":"As we can see however, the vernal equinox changes appreciably on very long timescales. For studies of paleoclimates, it is often conventional to reference the day of year relative to the vernal equinox rather than relative to January 1 to make meaningful comparisons of \"seasons\" and the like. (Image: )","category":"page"},{"location":"InsolationExamples/#Insolation-Examples","page":"Insolation Examples","title":"Insolation Examples","text":"","category":"section"},{"location":"InsolationExamples/#Diurnal-cycle-of-insolation","page":"Insolation Examples","title":"Diurnal cycle of insolation","text":"","category":"section"},{"location":"InsolationExamples/","page":"Insolation Examples","title":"Insolation Examples","text":"using Dates\n\ninclude(\"plot_diurnal_cycle.jl\")\n\n# Pasadena in January\nlat, lon = [34.15, -118.14]\ndate = DateTime(2020, 01, 10)\ntimezone = +8 # Pacific Standard Time\nod = Insolation.OrbitalData()\ndiurnal_cycle(lat, lon, date, od, timezone, \"Pasadena_January.png\")\n\n# Finland in June\nlat, lon = [66.50, 25.73]\ndate = DateTime(2020, 06, 10)\ntimezone = -3 # Eastern European Summer Time\ndiurnal_cycle(lat, lon, date, od, timezone, \"Finland_June.png\")","category":"page"},{"location":"InsolationExamples/","page":"Insolation Examples","title":"Insolation Examples","text":"(Image: ) (Image: )","category":"page"},{"location":"InsolationExamples/#Daily-mean-insolation","page":"Insolation Examples","title":"Daily-mean insolation","text":"","category":"section"},{"location":"InsolationExamples/#Insolation-in-J2000","page":"Insolation Examples","title":"Insolation in J2000","text":"","category":"section"},{"location":"InsolationExamples/","page":"Insolation Examples","title":"Insolation Examples","text":"import Insolation\nimport Insolation.Parameters as IP\n\nFT = Float64\ninclude(joinpath(pkgdir(Insolation), \"parameters\", \"create_parameters.jl\"))\nparam_set = create_insolation_parameters(FT)\n\ninclude(\"plot_insolation.jl\")\n\nγ0 = IP.obliq_epoch(param_set)\nϖ0 = IP.lon_perihelion_epoch(param_set)\ne0 = IP.eccentricity_epoch(param_set)\nod = Insolation.OrbitalData()\n\ndays, lats, F0 = calc_day_lat_insolation(od, 365, 180, param_set)\ntitle = format(\"γ = {:.2f}°, ϖ = {:.2f}°, e = {:.2f}\", rad2deg(γ0), rad2deg(ϖ0), e0) #hide\nplot_day_lat_insolation(days, lats, F0, \"YlOrRd\", title, \"insol_example1.png\")","category":"page"},{"location":"InsolationExamples/","page":"Insolation Examples","title":"Insolation Examples","text":"(Image: )","category":"page"},{"location":"InsolationExamples/#Insolation-with-smaller-obliquity","page":"Insolation Examples","title":"Insolation with smaller obliquity","text":"","category":"section"},{"location":"InsolationExamples/","page":"Insolation Examples","title":"Insolation Examples","text":"import Insolation\nimport Insolation.Parameters as IP\n\nFT = Float64\ninclude(joinpath(pkgdir(Insolation), \"parameters\", \"create_parameters.jl\"))\nparam_set = create_insolation_parameters(FT)\n\ninclude(\"plot_insolation.jl\") # hide\nγ0 = IP.obliq_epoch(param_set) # hide\nϖ0 = IP.lon_perihelion_epoch(param_set) # hide\ne0 = IP.eccentricity_epoch(param_set) # hide\nod = Insolation.OrbitalData()\ndays, lats, F0 = calc_day_lat_insolation(od, 365, 180, param_set) # hide\n\n# decrease γ to 20.0°\nparam_set = create_insolation_parameters(FT, (;obliq_epoch = deg2rad(20.0)))\nγ1 = IP.obliq_epoch(param_set)\ndays, lats, F2 = calc_day_lat_insolation(od, 365, 180, param_set)\n\ntitle = format(\"γ = {:.2f}°, ϖ = {:.2f}°, e = {:.2f}\", rad2deg(γ1), rad2deg(ϖ0), e0) # hide\nplot_day_lat_insolation(days,lats,F2,\"YlOrRd\",  title, \"insol_example2a.png\")\ntitle = format(\"insolation diff: γ' = {:.2f}° - γ = {:.2f}°\", rad2deg(γ1), rad2deg(γ0)) # hide\nplot_day_lat_insolation(days, lats, F2-F0, \"PRGn\", title, \"insol_example2b.png\")","category":"page"},{"location":"InsolationExamples/","page":"Insolation Examples","title":"Insolation Examples","text":"(Image: ) (Image: )","category":"page"},{"location":"InsolationExamples/#Insolation-with-very-large-obliquity-(like-Uranus)","page":"Insolation Examples","title":"Insolation with very large obliquity (like Uranus)","text":"","category":"section"},{"location":"InsolationExamples/","page":"Insolation Examples","title":"Insolation Examples","text":"import Insolation\nimport Insolation.Parameters as IP\n\nFT = Float64\ninclude(joinpath(pkgdir(Insolation), \"parameters\", \"create_parameters.jl\"))\nparam_set = create_insolation_parameters(FT)\n\ninclude(\"plot_insolation.jl\") # hide\nγ0 = IP.obliq_epoch(param_set) # hide\nϖ0 = IP.lon_perihelion_epoch(param_set) # hide\ne0 = IP.eccentricity_epoch(param_set) # hide\nod = Insolation.OrbitalData()\ndays, lats, F0 = calc_day_lat_insolation(od, 365, 180, param_set) # hide\n\n# now change obliquity to 97.86°\nparam_set = create_insolation_parameters(FT, (;obliq_epoch = deg2rad(97.86)))\nγ4 = IP.obliq_epoch(param_set)\ndays, lats, F5 = calc_day_lat_insolation(od, 365, 180, param_set)\n\ntitle = format(\"γ = {:.2f}°, ϖ = {:.2f}°, e = {:.2f}\", rad2deg(γ4), rad2deg(ϖ0), e0) # hide\nplot_day_lat_insolation(days,lats,F5,\"YlOrRd\", title, \"insol_example3a.png\")\ntitle = format(\"insolation diff: γ' = {:.2f}° - γ = {:.2f}°\", rad2deg(γ4), rad2deg(γ0)) # hide\nplot_day_lat_insolation(days, lats, F5-F0, \"PRGn\", title, \"insol_example3b.png\")\n","category":"page"},{"location":"InsolationExamples/","page":"Insolation Examples","title":"Insolation Examples","text":"(Image: ) (Image: )","category":"page"},{"location":"library/#Application-Programming-Interface-(APIs)","page":"APIs","title":"Application Programming Interface (APIs)","text":"","category":"section"},{"location":"library/","page":"APIs","title":"APIs","text":"Documenting the public user interface","category":"page"},{"location":"library/#Orbital-Parameters","page":"APIs","title":"Orbital Parameters","text":"","category":"section"},{"location":"library/","page":"APIs","title":"APIs","text":"Modules = [Insolation]\nPrivate = false\nPages   = [\"Insolation.jl\"]","category":"page"},{"location":"library/#Insolation.orbital_params-Union{Tuple{FT}, Tuple{Insolation.OrbitalData, FT}} where FT<:Real","page":"APIs","title":"Insolation.orbital_params","text":"orbital_params(od::OrbitalData, dt::FT) where {FT <: Real}\n\nParameters are interpolated from the values given in the Laskar 2004 dataset using a cubic spline interpolation.\n\nSee OrbitalData.\n\n\n\n\n\n","category":"method"},{"location":"library/","page":"APIs","title":"APIs","text":"Insolation.OrbitalData","category":"page"},{"location":"library/#Insolation.OrbitalData","page":"APIs","title":"Insolation.OrbitalData","text":"OrbitalData\n\nThe parameters vary due to Milankovitch cycles.\n\nOrbital parameters from the Laskar 2004 paper are lazily downloaded from Caltech Box to the orbital_parameters_dataset_path(artifact_dir) path where artifact_dir is the path and filename to save the artifacts toml file.\n\n\n\n\n\n","category":"type"},{"location":"library/#Zenith-Angle","page":"APIs","title":"Zenith Angle","text":"","category":"section"},{"location":"library/","page":"APIs","title":"APIs","text":"Modules = [Insolation]\nPrivate = true\nPages   = [\"ZenithAngleCalc.jl\"]","category":"page"},{"location":"library/#Insolation.daily_zenith_angle-Union{Tuple{FT}, Tuple{Dates.DateTime, Dates.DateTime, Insolation.OrbitalData, FT, Insolation.Parameters.AbstractInsolationParams}} where FT","page":"APIs","title":"Insolation.daily_zenith_angle","text":"daily_zenith_angle(date::DateTime,\n                   data0::DateTime,\n                   od::OrbitalData,\n                   latitude::FT,\n                   param_set::IP.AIP;\n                   eot_correction::Bool=true,\n                   milankovitch::Bool=true) where {FT <: Real}\n\nReturns the effective zenith angle corresponding to the diurnally averaged insolation and earth-sun distance at a particular latitude given the date.\n\nparam_set is an AbstractParameterSet from CLIMAParameters.jl.\n\neot_correction is an optional Boolean keyword argument that defaults to true when set to true the equation of time correction is turned on. This switch functionality is implemented for easy comparisons with reanalyses.\n\nmilankovitch is an optional Boolean keyword argument that defaults to true when set to true the orbital parameters are calculated for the given DateTime, when set to false the orbital parameters at the J2000 epoch from CLIMAParameters are used.\n\n\n\n\n\n","category":"method"},{"location":"library/#Insolation.distance_declination_hourangle-Union{Tuple{FT}, Tuple{Dates.DateTime, Dates.DateTime, Tuple{FT, FT, FT}, Insolation.Parameters.AbstractInsolationParams, Bool}} where FT","page":"APIs","title":"Insolation.distance_declination_hourangle","text":"distance_declination_hourangle(\n    date::DateTime,\n    date0::DateTime,\n    (ϖ, γ, e)::Tuple{FT, FT, FT},\n    param_set::IP.AIP,\n    eot_correction::Bool,\n) where {FT}\n\nReturns the earth-sun distance (m), declination angle (radians) and hour angle  (radians), at 0ᵒ longitude, given the current datetime, epoch datetime,  longitude of the perihelion at epoch, obliquity at epoch, eccentricity at epoch,  and eot_correction.\n\n\n\n\n\n","category":"method"},{"location":"library/#Insolation.instantaneous_zenith_angle-Union{Tuple{FT}, NTuple{5, FT}} where FT","page":"APIs","title":"Insolation.instantaneous_zenith_angle","text":"instantaneous_zenith_angle(\n    d::FT,\n    δ::FT,\n    η_UTC::FT,\n    longitude::FT,\n    latitude::FT,\n) where {FT}\n\nReturns the zenith angle (radians), azimuthal angle (radians) and Earth-Sun distance (m) at a particular longitude (degrees) and latitude (degrees) given Earth-Sun distance (m),  declination angle (radians), and hour angle (radians) at 0ᵒ longitude.\n\n\n\n\n\n","category":"method"},{"location":"library/#Insolation","page":"APIs","title":"Insolation","text":"","category":"section"},{"location":"library/","page":"APIs","title":"APIs","text":"Modules = [Insolation]\nPrivate = false\nPages   = [\"InsolationCalc.jl\"]","category":"page"},{"location":"library/#Insolation.insolation-Union{Tuple{FT}, Tuple{FT, FT, Insolation.Parameters.AbstractInsolationParams}} where FT<:Real","page":"APIs","title":"Insolation.insolation","text":"insolation(θ::FT, d::FT, param_set::IP.AIP) where {FT <: Real}\n\nReturns the insolation given the zenith angle and earth-sun distance param_set is an AbstractParameterSet from CLIMAParameters.jl.\n\n\n\n\n\n","category":"method"},{"location":"library/#Insolation.solar_flux_and_cos_sza-Union{Tuple{FT}, Tuple{Dates.DateTime, Dates.DateTime, Insolation.OrbitalData, FT, FT, Insolation.Parameters.AbstractInsolationParams}} where FT<:Real","page":"APIs","title":"Insolation.solar_flux_and_cos_sza","text":"solar_flux_and_cos_sza(date::DateTime,\n                  date0::DateTime,\n                  od::OrbitalData,\n                  longitude::FT,\n                  latitude::FT,\n                  param_set::IP.AIP) where {FT <: Real}\n\nReturns the top-of-atmosphere (TOA) solar flux, i.e.  the total solar irradiance (TSI) weighted by the earth-sun distance and cos(solar zenith angle) for input to RRTMGP.jl param_set is an AbstractParameterSet from CLIMAParameters.jl.\n\n\n\n\n\n","category":"method"},{"location":"ZenithAngleEquations/#Zenith-Angle-Equations","page":"Zenith Angle Equations","title":"Zenith Angle Equations","text":"","category":"section"},{"location":"ZenithAngleEquations/","page":"Zenith Angle Equations","title":"Zenith Angle Equations","text":"These equations are from Tapio Schneider and Lenka Novak's textbook draft, chapter 3.","category":"page"},{"location":"ZenithAngleEquations/#Mean-Anomaly","page":"Zenith Angle Equations","title":"Mean Anomaly","text":"","category":"section"},{"location":"ZenithAngleEquations/","page":"Zenith Angle Equations","title":"Zenith Angle Equations","text":"The mean anomaly M at current time t is","category":"page"},{"location":"ZenithAngleEquations/","page":"Zenith Angle Equations","title":"Zenith Angle Equations","text":"M = frac2pi (t - t_0)Y_a + M_0","category":"page"},{"location":"ZenithAngleEquations/","page":"Zenith Angle Equations","title":"Zenith Angle Equations","text":"where t_0 is the time at the epoch (J2000), defined as January 1, 2000 at 12hr UTC,  M_0 is the mean anomaly at the epoch, and Y_a is the length of the anomalistic year.","category":"page"},{"location":"ZenithAngleEquations/#True-Anomaly","page":"Zenith Angle Equations","title":"True Anomaly","text":"","category":"section"},{"location":"ZenithAngleEquations/","page":"Zenith Angle Equations","title":"Zenith Angle Equations","text":"The true anomaly A is given by","category":"page"},{"location":"ZenithAngleEquations/","page":"Zenith Angle Equations","title":"Zenith Angle Equations","text":"A = M + left( 2e - frac14e^3 right) sin(M) + frac54 e^2 sin(2M) + frac1312 e^3 sin(3M)","category":"page"},{"location":"ZenithAngleEquations/#True-Longitude","page":"Zenith Angle Equations","title":"True Longitude","text":"","category":"section"},{"location":"ZenithAngleEquations/","page":"Zenith Angle Equations","title":"Zenith Angle Equations","text":"The true longitude is the sum of the true anomaly and the longitude of perihelion (varpi),","category":"page"},{"location":"ZenithAngleEquations/","page":"Zenith Angle Equations","title":"Zenith Angle Equations","text":"L = A + varpi","category":"page"},{"location":"ZenithAngleEquations/#Declination","page":"Zenith Angle Equations","title":"Declination","text":"","category":"section"},{"location":"ZenithAngleEquations/","page":"Zenith Angle Equations","title":"Zenith Angle Equations","text":"The sine of the declination angle is","category":"page"},{"location":"ZenithAngleEquations/","page":"Zenith Angle Equations","title":"Zenith Angle Equations","text":"sin delta = sin gamma sin L","category":"page"},{"location":"ZenithAngleEquations/","page":"Zenith Angle Equations","title":"Zenith Angle Equations","text":"where gamma is the orbital obliquity.","category":"page"},{"location":"ZenithAngleEquations/#Equation-of-Time","page":"Zenith Angle Equations","title":"Equation of Time","text":"","category":"section"},{"location":"ZenithAngleEquations/","page":"Zenith Angle Equations","title":"Zenith Angle Equations","text":"The equation of time corrects for the difference between apparent solar time (local solar noon) and mean solar time due to the obliquity of the planet and eccentricity of the orbit,","category":"page"},{"location":"ZenithAngleEquations/","page":"Zenith Angle Equations","title":"Zenith Angle Equations","text":"Delta t = -2 e sin(M) + tan^2(gamma2) sin(2M+2varpi)","category":"page"},{"location":"ZenithAngleEquations/#Hour-Angle","page":"Zenith Angle Equations","title":"Hour Angle","text":"","category":"section"},{"location":"ZenithAngleEquations/","page":"Zenith Angle Equations","title":"Zenith Angle Equations","text":"The hour angle eta measures the longitude difference between the subsolar point position at time t and the current location. The hour angle is calculated with respect to the prime meridian and then the longitude is added to calculate the hour angle at the given location.","category":"page"},{"location":"ZenithAngleEquations/","page":"Zenith Angle Equations","title":"Zenith Angle Equations","text":"eta = eta_UTC + lambda = frac2pi (t+Delta t)T_d + lambda","category":"page"},{"location":"ZenithAngleEquations/","page":"Zenith Angle Equations","title":"Zenith Angle Equations","text":"where t is the current time referenced to the epoch t_0, T_d is the length of a day, and lambda is the longitude.","category":"page"},{"location":"ZenithAngleEquations/#Zenith-Angle","page":"Zenith Angle Equations","title":"Zenith Angle","text":"","category":"section"},{"location":"ZenithAngleEquations/","page":"Zenith Angle Equations","title":"Zenith Angle Equations","text":"The zenith angle at any time is given by,","category":"page"},{"location":"ZenithAngleEquations/","page":"Zenith Angle Equations","title":"Zenith Angle Equations","text":"cos theta = cos phi cos delta cos eta + sin phi sin delta","category":"page"},{"location":"ZenithAngleEquations/","page":"Zenith Angle Equations","title":"Zenith Angle Equations","text":"where phi is the latitude.","category":"page"},{"location":"ZenithAngleEquations/#Sunrise/Sunset-Angle","page":"Zenith Angle Equations","title":"Sunrise/Sunset Angle","text":"","category":"section"},{"location":"ZenithAngleEquations/","page":"Zenith Angle Equations","title":"Zenith Angle Equations","text":"The sunrise/sunset angle is the hour angle eta_d at which the sun rises or sets,","category":"page"},{"location":"ZenithAngleEquations/","page":"Zenith Angle Equations","title":"Zenith Angle Equations","text":"cos eta_d = - tan phi tan delta","category":"page"},{"location":"ZenithAngleEquations/#Diurnally-averaged-Insolation","page":"Zenith Angle Equations","title":"Diurnally averaged Insolation","text":"","category":"section"},{"location":"ZenithAngleEquations/","page":"Zenith Angle Equations","title":"Zenith Angle Equations","text":"The diurnally averaged insolation is obtained from the averaged cosine of the zenith angle, computed in terms of the sunrise/sunset hour angle as","category":"page"},{"location":"ZenithAngleEquations/","page":"Zenith Angle Equations","title":"Zenith Angle Equations","text":"overlinecos theta = frac1pi left( eta_d sin phi sin delta + cos phi cos delta cos eta_d right)","category":"page"},{"location":"ZenithAngleEquations/#Azimuth-Angle","page":"Zenith Angle Equations","title":"Azimuth Angle","text":"","category":"section"},{"location":"ZenithAngleEquations/","page":"Zenith Angle Equations","title":"Zenith Angle Equations","text":"The azimuth angle is","category":"page"},{"location":"ZenithAngleEquations/","page":"Zenith Angle Equations","title":"Zenith Angle Equations","text":"zeta = frac3pi2 - arctan left( fracsin etacos eta sin phi - tan delta cos phi right)","category":"page"},{"location":"ZenithAngleEquations/","page":"Zenith Angle Equations","title":"Zenith Angle Equations","text":"The azimuth is defined as 0 to the East and increasing counter-clockwise, such that at local solar noon when eta=0, then zeta = frac3pi2.","category":"page"},{"location":"ZenithAngleEquations/#Planet-Sun-Distance","page":"Zenith Angle Equations","title":"Planet-Sun Distance","text":"","category":"section"},{"location":"ZenithAngleEquations/","page":"Zenith Angle Equations","title":"Zenith Angle Equations","text":"The distance between the planet and the sun depends on the eccentricity of the orbit e, true anomaly A, and mean planet-sun distance d_0 through","category":"page"},{"location":"ZenithAngleEquations/","page":"Zenith Angle Equations","title":"Zenith Angle Equations","text":"d = frac1-e^21+ecos A d_0","category":"page"},{"location":"ZenithAngleEquations/","page":"Zenith Angle Equations","title":"Zenith Angle Equations","text":"For the Earth, d_0 = 1 AU.","category":"page"},{"location":"#Insolation.jl","page":"Home","title":"Insolation.jl","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"CurrentModule = Insolation","category":"page"},{"location":"","page":"Home","title":"Home","text":"Insolation.jl is a library that calculates the zenith angle and insolation  at a given point point in space-time on an arbitrary planet. The spatial location is defined by a (lat, lon) and the date specified with a  DateTime object. The planet is defined by the orbital parameters  (obliquity, eccentricity, and longitude of perihelion). The library is split between two files, ZenithAngleCalc.jl  which calculates the zenith angle, azimuth angle, and planet-star distance,  and InsolationCalc.jl which calculates the insolation given a zenith angle.","category":"page"},{"location":"","page":"Home","title":"Home","text":"The zenith angle and insolation can both be calculated either as instantaneous  values or as daily averaged values. The functions in ZenithAngleCalc.jl are  overwritten to accept a variety of inputs, either calculating the orbital parameters  given a DateTime object, or prescribing the orbital parameters as input.","category":"page"},{"location":"","page":"Home","title":"Home","text":"The equations used for calculating orbital parameters are from Tapio Schneider's textbook draft.  See Zenith Angle Equations for more details.","category":"page"},{"location":"","page":"Home","title":"Home","text":"This package has been designed to be flexible for an arbitrary planet, but designed  to calculate the insolation on Earth as the input for a climate model.","category":"page"},{"location":"#Authors","page":"Home","title":"Authors","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Insolation.jl is being developed by the Climate Modeling Alliance. Specifically it has been developed to be used for the input to RRTMGP.jl from ClimaAtmos.jl.","category":"page"}]
}
