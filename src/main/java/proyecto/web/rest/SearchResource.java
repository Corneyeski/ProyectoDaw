package proyecto.web.rest;

import com.codahale.metrics.annotation.Timed;
import liquibase.util.NumberUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import proyecto.domain.Offer;
import proyecto.domain.Photo;
import proyecto.domain.User;
import proyecto.domain.UserExt;
import proyecto.repository.*;

import javax.inject.Inject;
import javax.transaction.Transactional;
import java.net.URISyntaxException;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class
SearchResource {

    private final Logger log = LoggerFactory.getLogger(PhotoResource.class);

    @Inject
    private UserExtCriteriaRepository userExtCriteriaRepository;

    @Inject
    private PhotoCriteriaRepository photoCriteriaRepository;

    @Inject
    private OfferCriteriaRepository offerCriteriaRepository;

    @RequestMapping(value = "/search/users",method = RequestMethod.GET,produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    @Transactional
    public ResponseEntity<List<UserExt>> searchUsers(
        @RequestParam(value = "city", required = false) String city,
        @RequestParam(value = "minPoints", required = false) Double minPopular,
        @RequestParam(value = "maxPoints", required = false) Double maxPopular,
        @RequestParam(value = "tags", required = false) String tags,
        @RequestParam(value = "validated", required = false) boolean validated,
        @RequestParam(value = "ageMin", required = false) Integer ageMin,
        @RequestParam(value = "ageMax", required = false) Integer ageMax
    ) throws URISyntaxException {

        Map<String, Object> params = new HashMap<>();

        if (city != null && !city.equalsIgnoreCase("")) {
            params.put("city",city);
        }
        if(maxPopular != null && maxPopular > 0.0 && maxPopular > minPopular){
            params.put("maxPopular",maxPopular);
        }
        if(minPopular != null && minPopular > 0.0){
            params.put("minPopular",minPopular);
        }
        if(tags != null && !tags.equals("")){
            params.put("tags",tags);
        }
        if(validated){
            params.put("validated",validated);
        }
        if(ageMin != null && ageMin > 0){
            params.put("agemin",ageMin);
        }
        if(ageMax != null && ageMax > 0){
            params.put("agemax",ageMax);
        }

        List<UserExt> result = userExtCriteriaRepository.filterUserextDefinitions(params);

        return new ResponseEntity<>(
            result,
            HttpStatus.OK);
    }

    @RequestMapping(value = "/search/photos",method = RequestMethod.GET,produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    @Transactional
    public ResponseEntity<List<Photo>> searchPhoto(
        @RequestParam(value = "username", required = false) String username,
        @RequestParam(value = "minPoints", required = false) Double minPopular,
        @RequestParam(value = "maxPoints", required = false) Double maxPopular,
        @RequestParam(value = "tags", required = false) String tags,
        @RequestParam(value = "date", required = false) Date time
    ) throws URISyntaxException {

        Map<String, Object> params = new HashMap<>();

        if(username != null && !username.equals("")){
            params.put("username",username);
        }

        if(maxPopular != null && maxPopular > 0.0 && maxPopular > minPopular){
            params.put("maxPopular",maxPopular);
        }
        if(minPopular != null && minPopular > 0.0){
            params.put("minPopular",minPopular);
        }
        if(tags != null && !tags.equals("")){
            params.put("tags",tags);
        }
        if(time != null){
            params.put("time",time);
        }

        List<Photo> result = photoCriteriaRepository.filterPhotoDefinitions(params);

        return new ResponseEntity<>(
            result,
            HttpStatus.OK);
    }

    @RequestMapping(value = "/search/offer",method = RequestMethod.GET,produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    @Transactional
    public ResponseEntity<List<Offer>> searchOffer(
        @RequestParam(value = "search", required = false) String search,
        @RequestParam(value = "tags", required = false) String tags,
        @RequestParam(value = "date", required = false) ZonedDateTime time,
        @RequestParam(value = "minSalary", required = false) Double minSalary,
        @RequestParam(value = "maxSalary", required = false) Double maxSalary,
        @RequestParam(value = "city", required = false) String city
    ) throws URISyntaxException {

        Map<String, Object> params = new HashMap<>();

        if(search != null || !search.equals("")){
            params.put("search",search);
        }
        if(tags != null || !tags.equals("")){
            params.put("tags",tags);
        }
        if(city != null && !city.equals("")){
            params.put("city",city);
        }
        if(time != null && !time.equals("")){
            params.put("time",time);
        }
        if(maxSalary != null && maxSalary > 0.0 && maxSalary > minSalary){
            params.put("maxSalary",maxSalary);
        }
        if(minSalary != null && minSalary > 0.0){
            params.put("minSalary",minSalary);
        }

        List<Offer> result = offerCriteriaRepository.filterOfferDefinitions(params);

        return new ResponseEntity<>(
            result,
            HttpStatus.OK);
    }

}
