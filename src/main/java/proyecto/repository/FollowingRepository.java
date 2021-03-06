package proyecto.repository;

import org.springframework.data.repository.query.Param;
import proyecto.domain.Following;

import org.springframework.data.jpa.repository.*;
import proyecto.domain.User;

import java.util.List;

/**
 * Spring Data JPA repository for the Following entity.
 */
@SuppressWarnings("unused")
public interface FollowingRepository extends JpaRepository<Following,Long> {

    @Query("select following from Following following where following.follower.login = ?#{principal.username}")
    List<Following> findByFollowerIsCurrentUser();

    @Query("select following from Following following where following.followed.login = ?#{principal.username}")
    List<Following> findByFollowedIsCurrentUser();

    @Query("select following.follower from Following following where following.followed =:user")
    List<User> SelectFollowingFindByFollower(@Param("user")User user);

    @Query("select following from Following following where following.follower =:user")
    List<Following> findByFollowersOneUser(@Param("user")User user);

    /*@Query("select  following from Following following where following.follower =:follower and following.followed =:followed")
    Following findExistByFollowerAndFollowed(@Param("followed")User followed,@Param("follower")User follower);*/

    Following findByFollowedAndFollower(User followed, User follower);

}
