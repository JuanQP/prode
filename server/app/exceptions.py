from rest_framework.exceptions import APIException


class LeagueIsPublic(APIException):
  status_code = 400
  default_detail = "This League is public. Join request is unnecesary."
  default_code = "league_is_public"

class UnansweredRequests(APIException):
  status_code = 400
  default_detail = "You have unanswered join requests."
  default_code = "unanswered_requests"
